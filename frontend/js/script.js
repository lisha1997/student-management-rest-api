//frontend integration with student api
const API_URL = 'http://localhost:3000/siswa';

const form = document.getElementById('siswaForm');

const siswaId = document.getElementById('siswaId');

const nis = document.getElementById('nis');
const nama = document.getElementById('nama');
const kelas = document.getElementById('kelas');
const jurusan = document.getElementById('jurusan');
const alamat = document.getElementById('alamat');

const siswaTable = document.getElementById('siswaTable');

const loading = document.getElementById('loading');

const message = document.getElementById('message');

const formTitle = document.getElementById('formTitle');

const submitButton =
    document.getElementById('submitButton');

const cancelButton =
    document.getElementById('cancelButton');



function showMessage(text, type) {

    message.textContent = text;

    message.className = type;

    message.style.display = 'block';

    setTimeout(() => {

        message.style.display = 'none';

    }, 3000);

}

async function getResponseData(response) {

    const contentType =
        response.headers.get('content-type');

    if (!contentType ||
        !contentType.includes('application/json')) {

        const text = await response.text();

        console.error(
            'Response bukan JSON:',
            text
        );

        throw new Error(
            'Server tidak mengembalikan JSON. ' +
            'Periksa alamat dan port backend.'
        );
    }

    return await response.json();
}

async function getSiswa() {

    loading.style.display = 'block';

    siswaTable.innerHTML = '';

    try {

        const response =
            await fetch(`${API_URL}`);


        const result =
            await getResponseData(response);


        if (!response.ok) {

            throw new Error(
                result.message ||
                'Gagal mengambil data siswa'
            );

        }


        const data = result.data;


        if (!data || data.length === 0) {

            siswaTable.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;">
                        Belum ada data siswa
                    </td>
                </tr>
            `;

            return;
        }


        data.forEach((siswa, index) => {

            const row =
                document.createElement('tr');


            row.innerHTML = `

                <td>${index + 1}</td>

                <td>${siswa.nis}</td>

                <td>${siswa.nama}</td>

                <td>${siswa.kelas}</td>

                <td>${siswa.jurusan}</td>

                <td>${siswa.alamat}</td>

                <td>

                    <button
                        class="edit"
                        onclick="editSiswa(${siswa.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete"
                        onclick="deleteSiswa(${siswa.id})"
                    >
                        Hapus
                    </button>

                </td>

            `;


            siswaTable.appendChild(row);

        });


    } catch (error) {
        console.error(
            'GET SISWA ERROR:',
            error
        );


        showMessage(
            error.message ||
            'Gagal mengambil data siswa',
            'error'
        );


    } finally {

        loading.style.display = 'none';

    }

}


form.addEventListener(
    'submit',
    async function (event) {

        event.preventDefault();


        const data = {
            nis: nis.value.trim(),
            nama: nama.value.trim(),
            kelas: kelas.value.trim(),
            jurusan: jurusan.value.trim(),
            alamat: alamat.value.trim()

        };


        try {

            let response;
            if (siswaId.value) {

                response =
                    await fetch(
                        `${API_URL}/put/${siswaId.value}`,
                        {

                            method: 'PUT',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body:
                                JSON.stringify(data)

                        }
                    );

            }

            else {

                response =
                    await fetch(
                        `${API_URL}/post`,
                        {

                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body:
                                JSON.stringify(data)

                        }
                    );

            }


            const result =
                await getResponseData(response);


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    'Request gagal'
                );

            }


            showMessage(
                result.message ||
                'Data berhasil disimpan',
                'success'
            );


            resetForm();


            await getSiswa();


        } catch (error) {

            console.error(
                'POST/PUT ERROR:',
                error
            );


            showMessage(
                error.message ||
                'Terjadi kesalahan',
                'error'
            );

        }

    }
);

async function editSiswa(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        const result =
            await getResponseData(response);


        if (!response.ok) {

            throw new Error(
                result.message ||
                'Gagal mengambil data siswa'
            );

        }


        const siswa =
            result.data;


        siswaId.value =
            siswa.id;

        nis.value =
            siswa.nis;

        nama.value =
            siswa.nama;

        kelas.value =
            siswa.kelas;

        jurusan.value =
            siswa.jurusan;

        alamat.value =
            siswa.alamat;


        formTitle.textContent =
            'Edit Siswa';

        submitButton.textContent =
            'Update Siswa';

        cancelButton.style.display =
            'inline-block';


        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });


    } catch (error) {

        console.error(
            'EDIT ERROR:',
            error
        );


        showMessage(
            error.message ||
            'Gagal mengambil data siswa',
            'error'
        );

    }

}


async function deleteSiswa(id) {

    const yakin =
        confirm(
            'Apakah kamu yakin ingin menghapus siswa ini?'
        );


    if (!yakin) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/delete/${id}`,
                {
                    method: 'DELETE'
                }
            );


        const result =
            await getResponseData(response);


        if (!response.ok) {

            throw new Error(
                result.message ||
                'Gagal menghapus siswa'
            );

        }


        showMessage(
            result.message ||
            'Data berhasil dihapus',
            'success'
        );


        await getSiswa();


    } catch (error) {

        console.error(
            'DELETE ERROR:',
            error
        );


        showMessage(
            error.message ||
            'Gagal menghapus siswa',
            'error'
        );

    }

}


function resetForm() {

    form.reset();

    siswaId.value = '';


    formTitle.textContent =
        'Tambah Siswa';


    submitButton.textContent =
        'Tambah Siswa';


    cancelButton.style.display =
        'none';

}


function cancelEdit() {

    resetForm();

}


getSiswa();
