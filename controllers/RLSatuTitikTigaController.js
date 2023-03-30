import { databaseSIRS } from '../config/Database.js'
import { rlSatuTitikTigaHeader, rlSatuTitikTigaDetail, jenisPelayanan } from '../models/RLSatuTitikTiga.js'
import Joi from 'joi'
import { rumahSakit } from '../models/RumahSakit.js'

export const getDataRLSatuTitikTigaKodeRSTahun = (req, res) => {
    if(req.user.jenis_user_id == 2){
        // console.log('provinsi')
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                provinsi_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlSatuTitikTigaHeader.findAll({
                attributes: ['id','tahun'],
                where:{
                    rs_id: getkoders,
                    tahun: req.query.tahun,
                },
                include:{
                    model: rlSatuTitikTigaDetail,
                    required: true,
                    include: {
                        model: jenisPelayanan
                    }
                },
                order: [[{ model: rlSatuTitikTigaDetail }, 'jenis_pelayanan_id', 'ASC']]
            })
            .then((resultsdata) => {
                res.status(200).send({
                    status: true,
                    message: "data found",
                    dataRS: results,
                    data: resultsdata
                })
            })
            .catch((err) => {
                res.status(422).send({
                    status: false,
                    message: err
                })
                return
            })
        })
        .catch((err) => {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        })
    } else if(req.user.jenis_user_id == 3){
        // console.log('kab')
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                kab_kota_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlSatuTitikTigaHeader.findAll({
                attributes: ['id','tahun'],
                where:{
                    rs_id: getkoders,
                    tahun: req.query.tahun,
                },
                include:{
                    model: rlSatuTitikTigaDetail,
                    required: true,
                    include: {
                        model: jenisPelayanan
                    }
                },
                order: [[{ model: rlSatuTitikTigaDetail }, 'jenis_pelayanan_id', 'ASC']]
            })
            .then((resultsdata) => {
                res.status(200).send({
                    status: true,
                    message: "data found",
                    dataRS: results,
                    data: resultsdata
                })
            })
            .catch((err) => {
                res.status(422).send({
                    status: false,
                    message: err
                })
                return
            })
        })
        .catch((err) => {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        })
    }
}
