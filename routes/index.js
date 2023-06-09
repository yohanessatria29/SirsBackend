import express from 'express'

// Token
import { getDataUser, insertDataUser, login, logout, changePassword, loginadmin, logoutadmin } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

// References
import { getDataRumahSakit, getDataRumahSakitFilterbyKabKotaId } from '../controllers/RumahSakitController.js'
import { getDataJenisPelayanan } from '../controllers/JenisPelayananController.js'
import { getDataCaraPembayaran } from '../controllers/CaraPembayaranController.js'
import { getDataJenisSpesialis } from '../controllers/JenisSpesialisController.js'
import { getDataJenisKegiatan, getDataJenisKegiatanLab } from '../controllers/JenisKegiatanController.js'
import { getDataJenisTindakan, getDataGroupJenisTindakan } from '../controllers/JenisGroupTindakanController.js'
import { getMetoda } from '../controllers/MetodaController.js'
import { getGolonganObat } from '../controllers/GolonganObatController.js'
import { getNoUrut } from '../controllers/NoUrutController.js'
import { getIcd10 } from '../controllers/Icd10Controller.js'
import { getDataJenisGolSebabPenyakit, getDataJenisGolSebabPenyakitA, getDataJenisGolSebabPenyakitAbyId, getDataJenisGolSebabPenyakitASebab} from "../controllers/JenisGolSebabPenyakitController.js"
import { getDataJenisGolonganSebabPenyakit, getDataJenisGolonganSebabPenyakitB, getDataJenisGolonganSebabPenyakitBId } from '../controllers/JenisGolonganSebabPenyakitController.js'
import { getDataJenisGolonganPenyakitB, getDataJenisGolonganPenyakitBId} from '../controllers/JenisGolonganPenyakitController.js'
import { getDataKabKota, getDataKabKotabyID } from '../controllers/KabKotaController.js'

// RL 1.3
import { getDataRLSatuTitikTigaKodeRSTahun } from '../controllers/RLSatuTitikTigaController.js'

// RL 3.1
import { getDataRLTigaTitikSatuKodeRSTahun } from '../controllers/RLTigaTitikSatuController.js'

// RL 3.6
import { getDataRLTigaTitikEnamKodeRSTahun } from '../controllers/RLTigaTitikEnamController.js'

// RL 3.9
import { getDataRLTigaTitikSembilanKodeRSTahun } from '../controllers/RLTigaTitikSembilanController.js'

// RL.4b
import { getDataRLEmpatBKodeRSTahun } from "../controllers/RLEmpatBController.js"

// RL. 4b sebab
import { getDataRLEmpatBSebabKodeRSTahun } from '../controllers/RLEmpatBSebabController.js'

// VALIDASI
import { getDataValidasiByRsId, getStatusValidasi, insertValidasi, updateValidasi } from '../controllers/ValidasiController.js'

const router = express.Router()



// User
router.get('/apisirs/users', verifyToken, getDataUser)
router.post('/apisirs/users', insertDataUser)
router.patch('/apisirs/users/:id/admin', verifyToken, changePassword)

// Token
router.post('/apisirs/login', login)
router.delete('/apisirs/logout', logout)
router.get('/apisirs/token', refreshToken)

// Jenis Pelayanan
router.get('/apisirs/jenispelayanan', verifyToken,
    getDataJenisPelayanan)

// Cara Pembayaran
router.get('/apisirs/carapembayaran', verifyToken,
    getDataCaraPembayaran)

// Jenis Kegiatan
router.get('/apisirs/jeniskegiatan', verifyToken,
getDataJenisKegiatan)
//Jenis Kegiatan Lab 3.8
router.get('/apisirs/jeniskegiatanlab', verifyToken,
getDataJenisKegiatanLab)

// Jenis Spesialis
router.get('/apisirs/jenisspesialis', verifyToken,
    getDataJenisSpesialis)

// Group Jenis Tindakan
router.get('/apisirs/jenisgrouptindakan', verifyToken, getDataGroupJenisTindakan)

// Jenis Golongan Sebab Penyakit
router.get(
    "/apisirs/jenisgolsebabpenyakit",
    verifyToken,
    getDataJenisGolSebabPenyakit
)
router.get(
    "/apisirs/jenisgolsebabpenyakita/cari",
    verifyToken,
    getDataJenisGolSebabPenyakitA
)
router.get(
    "/apisirs/jenisgolsebabpenyakitasebab/cari",
    verifyToken,
    getDataJenisGolSebabPenyakitASebab
)
router.get(
    "/apisirs/jenisgolsebabpenyakita/id",
    verifyToken,
    getDataJenisGolSebabPenyakitAbyId
)

router.get('/apisirs/jenisgolongansebabpenyakit', verifyToken, getDataJenisGolonganSebabPenyakit)

// DINKES PROVINSI
router.post('/apisirs/loginadmin', loginadmin)
router.delete('/apisirs/logoutadmin', logoutadmin)
router.get('/apisirs/token', refreshToken)

// Get Data Dinkes
// router.get('/apisirs/apisirs/:id', verifyToken, getDataRumahSakit)

// GET DATA KAB KOTA
router.get('/apisirs/kabkota', verifyToken, getDataKabKota)

// GET DATA KABKOTA DINKES KAB
// router.get('/apisirs/kabkotaid', verifyToken, getDataKabKotabyID)

// GET DATA RS BY KAB KOTA
router.get('/apisirs/rumahsakit', verifyToken, getDataRumahSakitFilterbyKabKotaId)

// Rumah Sakit
router.get('/apisirs/rumahsakit/:id', verifyToken, getDataRumahSakit)

// Validasi Data
router.get('/apisirs/validasi', verifyToken, getDataValidasiByRsId)
router.post('/apisirs/validasi', verifyToken, insertValidasi)
router.patch('/apisirs/validasi/:id', verifyToken, updateValidasi)
router.get('/apisirs/statusvalidasi', getStatusValidasi)

// // GET DATA
router.get('/apisirs/rlsatutitiktigaadmin', verifyToken, getDataRLSatuTitikTigaKodeRSTahun)
router.get('/apisirs/rltigatitiksatuadmin', verifyToken, getDataRLTigaTitikSatuKodeRSTahun)
router.get('/apisirs/rltigatitikenamadmin', verifyToken, getDataRLTigaTitikEnamKodeRSTahun)
router.get('/apisirs/rltigatitiksembilanadmin', verifyToken, getDataRLTigaTitikSembilanKodeRSTahun)
router.get('/apisirs/rlempatbadmin',verifyToken, getDataRLEmpatBKodeRSTahun)
router.get('/apisirs/rlempatbsebabadmin', verifyToken, getDataRLEmpatBSebabKodeRSTahun)

export default router