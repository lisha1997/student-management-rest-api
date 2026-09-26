//rest api configuration
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 3000;
const siswa = require('./routes/siswa');
const db = require('./config/database');

app.use('/', siswa);

app.get('/siswa', async (req, res) => {

    try {

        const sql = 'SELECT * FROM siswa';
        const [rows] =
            await db.promise().query(sql);
        res.status(200).json({
            status: true,
            data: rows
        });

    } catch (error) {
        console.error('Error retrieving siswa:', error);
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada server'
        });

    }

});

app.get('/siswa/:id', async (req, res) => {

    const siswaId = req.params.id;
    try {
        const sql =
            'SELECT * FROM siswa WHERE id = ?';
        const [rows] =
            await db.promise().query(
                sql,
                [siswaId]
            );
        if (rows.length === 0) {

            return res.status(404).json({
                status: false,
                message: 'Siswa tidak ditemukan'
            });

        }
        res.status(200).json({
            status: true,
            data: rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada server'
        });

    }

});

app.post('/siswa/post', async (req, res) => {

    const { nis, nama, kelas, jurusan, alamat } = req.body;
    if (!nis || nis.toString().trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'NIS tidak boleh kosong'
        });

    }

    if (!/^\d+$/.test(nis.toString().trim())) {

        return res.status(400).json({
            status: false,
            message: 'NIS hanya boleh berisi angka'
        });

    }

    if (!nama || nama.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Nama tidak boleh kosong'
        });

    }

    if (!/^[a-zA-Z\s]+$/.test(nama.trim())) {

        return res.status(400).json({
            status: false,
            message: 'Nama hanya boleh berisi huruf dan spasi'
        });

    }

    if (!kelas || kelas.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Kelas tidak boleh kosong'
        });

    }

    if (!jurusan || jurusan.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Jurusan tidak boleh kosong'
        });

    }

    if (!alamat || alamat.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Alamat tidak boleh kosong'
        });

    }

    try {

        const checkSql = `SELECT id FROM siswa WHERE nis = ?`;
        const [existingSiswa] =
            await db.promise().query(
                checkSql,
                [nis.toString().trim()]
            );

        if (existingSiswa.length > 0) {

            return res.status(409).json({
                status: false,
                message: 'NIS sudah digunakan'
            });

        }

        const sql = `INSERT INTO siswa (nis, nama, kelas, jurusan, alamat)
            VALUES (?, ?, ?, ?, ?)`;

        const values = [
            nis.toString().trim(),
            nama.trim(),
            kelas.trim(),
            jurusan.trim(),
            alamat.trim()
        ];

        const [result] =
            await db.promise().query(
                sql,
                values
            );

        res.status(201).json({
            status: true,
            message: 'Data siswa berhasil ditambahkan',

            data: {
                id: result.insertId,
                nis: nis.toString().trim(),
                nama: nama.trim(),
                kelas: kelas.trim(),
                jurusan: jurusan.trim(),
                alamat: alamat.trim()
            }

        });

    } catch (error) {
        console.error(error);
        // Kalau NIS UNIQUE di database
        if (error.code === 'ER_DUP_ENTRY') {

            return res.status(409).json({
                status: false,
                message: 'NIS sudah digunakan'
            });

        }

        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada server'
        });

    }

});

app.put('/siswa/put/:id', async (req, res) => {

    const siswaId = req.params.id;
    const { nis, nama, kelas, jurusan, alamat } = req.body;

    if (!nis || nis.toString().trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'NIS tidak boleh kosong'
        });

    }

    if (!/^\d+$/.test(nis.toString().trim())) {

        return res.status(400).json({
            status: false,
            message: 'NIS hanya boleh berisi angka'
        });

    }

    if (!nama || nama.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Nama tidak boleh kosong'
        });

    }

    if (!/^[a-zA-Z\s]+$/.test(nama.trim())) {

        return res.status(400).json({
            status: false,
            message: 'Nama hanya boleh berisi huruf dan spasi'
        });

    }

    if (!kelas || kelas.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Kelas tidak boleh kosong'
        });

    }

    if (!jurusan || jurusan.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Jurusan tidak boleh kosong'
        });

    }

    if (!alamat || alamat.trim() === '') {

        return res.status(400).json({
            status: false,
            message: 'Alamat tidak boleh kosong'
        });

    }


    try {

        const checkSiswaSql = `
            SELECT id
            FROM siswa
            WHERE id = ?
        `;

        const [siswaRows] =
            await db.promise().query(
                checkSiswaSql,
                [siswaId]
            );


        if (siswaRows.length === 0) {

            return res.status(404).json({
                status: false,
                message: 'Siswa tidak ditemukan'
            });

        }

        const checkNisSql = `SELECT id FROM siswa WHERE nis = ? AND id != ?`;
        const [nisRows] =
            await db.promise().query(
                checkNisSql,
                [
                    nis.toString().trim(),
                    siswaId
                ]
            );


        if (nisRows.length > 0) {

            return res.status(409).json({
                status: false,
                message: 'NIS sudah digunakan oleh siswa lain'
            });

        }

        const sql = `UPDATE siswa SET nis = ?, nama = ?, kelas = ?, jurusan = ?, alamat = ? WHERE id = ?`;

        await db.promise().query(
            sql,
            [
                nis.toString().trim(),
                nama.trim(),
                kelas.trim(),
                jurusan.trim(),
                alamat.trim(),
                siswaId
            ]
        );

        res.status(200).json({
            status: true,
            message: 'Data siswa berhasil diupdate',
            data: {
                id: Number(siswaId),
                nis: nis.toString().trim(),
                nama: nama.trim(),
                kelas: kelas.trim(),
                jurusan: jurusan.trim(),
                alamat: alamat.trim()
            }

        });

    } catch (error) {

        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: false,
                message: 'NIS sudah digunakan'
            });

        }

        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada server'
        });

    }

});

app.delete('/siswa/delete/:id', async (req, res) => {

    const siswaId = req.params.id;

    try {

        const sql =
            'DELETE FROM siswa WHERE id = ?';
        const [result] =
            await db.promise().query(
                sql,
                [siswaId]
            );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                status: false,
                message: 'Siswa tidak ditemukan'
            });

        }

        res.status(200).json({
            status: true,
            message: 'Data siswa berhasil dihapus'
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada server'
        });

    }

});


app.listen(port, () => {

    console.log(
        `Server berjalan di http://localhost:${port}`
    );

});