import { databaseSIRS } from "../config/Database.js";
import { rlTigaTitikSembilanHeader, rlTigaTitikSembilanDetail, jenisGroupTindakanHeader, jenisGroupTindakan } from "../models/RLTigaTitikSembilan.js";
import { rumahSakit } from "../models/RumahSakit.js";
import joi from "joi";

export const getDataRLTigaTitikSembilanKodeRSTahun = async (req, res) => {
    if(req.user.jenis_user_id == 2){
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                provinsi_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlTigaTitikSembilanHeader.findAll({
                include: {
                    model: rlTigaTitikSembilanDetail,        
                    where: {
                        rs_id: getkoders,
                        tahun: req.query.tahun,
                    },
                    include: {
                        model: jenisGroupTindakan,
                        // attributes: ['id', 'nama'],
                        include : {
                            model:  jenisGroupTindakanHeader
                        }
                    },
                },
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
    } else if (req.user.jenis_user_id == 3){
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                kab_kota_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlTigaTitikSembilanHeader.findAll({
                include: {
                    model: rlTigaTitikSembilanDetail,        
                    where: {
                        rs_id: getkoders,
                        tahun: req.query.tahun,
                    },
                    include: {
                        model: jenisGroupTindakan,
                        // attributes: ['id', 'nama'],
                        include : {
                            model:  jenisGroupTindakanHeader
                        }
                    },
                },
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