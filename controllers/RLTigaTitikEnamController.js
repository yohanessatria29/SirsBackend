import { databaseSIRS } from "../config/Database.js"
import { rlTigaTitikEnamHeader, rlTigaTitikEnamDetail, rlTigaTItikEnamSpesialis } from "../models/RLTigaTitikEnam.js"
import joi from 'joi'
import { kabKota, rumahSakit } from "../models/RumahSakit.js";   
import { Sequelize } from "sequelize";
const Op = Sequelize.Op

export const getDataRLTigaTitikEnamKodeRSTahun = (req, res) => {
    if(req.user.jenis_user_id == 2){
        // console.log('propinsi')
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                provinsi_id : req.user.rsId
            },
        })
        .then((results) => {
        const getkoders = results.dataValues.Propinsi;
        rlTigaTitikEnamHeader
        .findAll({
          include: {
            model: rlTigaTitikEnamDetail,
            where: {
              rs_id: getkoders,
              tahun: req.query.tahun,
            },
            include: {
              model: rlTigaTItikEnamSpesialis,
              attributes: ["no", "nama"],
            },
          },
        })
        .then((resultsdata) => {
          res.status(200).send({
            status: true,
            message: "data found",
            dataRS: results,
            data: resultsdata,
          });
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
          message: err,
        });
        return;
    });
    } else if(req.user.jenis_user_id == 3){
        // console.log('kab/kota')
            rumahSakit.findOne({
                where: {
                    Propinsi: req.query.koders,
                    kab_kota_id : req.user.rsId
                },
            })
            .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlTigaTitikEnamHeader
            .findAll({
              include: {
                model: rlTigaTitikEnamDetail,
                where: {
                  rs_id: getkoders,
                  tahun: req.query.tahun,
                },
                include: {
                  model: rlTigaTItikEnamSpesialis,
                  attributes: ["no", "nama"],
                },
              },
            })
            .then((resultsdata) => {
              res.status(200).send({
                status: true,
                message: "data found",
                dataRS: results,
                data: resultsdata,
              });
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
              message: err,
            });
            return;
        });
    }
  };