import { databaseSIRS } from '../config/Database.js'
import { rlTigaTitikSatuHeader, rlTigaTitikSatuDetail, jenisPelayanan } from '../models/RLTigaTitikSatu.js'
import { rumahSakit } from "../models/RumahSakit.js";
import Joi from 'joi'

export const getDataRLTigaTitikSatuKodeRSTahun = (req, res) => {
    if(req.user.jenis_user_id == 2){
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                provinsi_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlTigaTitikSatuHeader.findAll({
                attributes: ['id','tahun'],
                where:{
                    rs_id: getkoders,
                    tahun: req.query.tahun,
                },
                include:{
                    model: rlTigaTitikSatuDetail,
                    required: true,
                    include: {
                        model: jenisPelayanan
                    }
                },
                // raw: true,
                // nest: true,
                order: [[{ model: rlTigaTitikSatuDetail }, 'jenis_pelayanan_id', 'ASC']]
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
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                kab_kota_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlTigaTitikSatuHeader.findAll({
                attributes: ['id','tahun'],
                where:{
                    rs_id: getkoders,
                    tahun: req.query.tahun,
                },
                include:{
                    model: rlTigaTitikSatuDetail,
                    required: true,
                    include: {
                        model: jenisPelayanan
                    }
                },
                // raw: true,
                // nest: true,
                order: [[{ model: rlTigaTitikSatuDetail }, 'jenis_pelayanan_id', 'ASC']]
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