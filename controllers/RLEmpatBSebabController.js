import { databaseSIRS } from "../config/Database.js";
import { rlEmpatBSebabHeader, rlEmpatBSebabDetail, rlEmpatJenisGolPenyakit } from "../models/RLEmpatBSebab.js";
import { rumahSakit } from "../models/RumahSakit.js";
import joi from "joi";

export const getDataRLEmpatBSebabKodeRSTahun = (req, res) => {
    if(req.user.jenis_user_id == 2){
        rumahSakit.findOne({
          where: {
              Propinsi: req.query.koders,
              provinsi_id : req.user.rsId
          }
        })
          .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlEmpatBSebabHeader
            .findAll({
              attributes: ["rs_id", "tahun"],
              where: {
                rs_id: getkoders,
                tahun: req.query.tahun,
              },
              include: {
                model: rlEmpatBSebabDetail,
                include: {
                  model: rlEmpatJenisGolPenyakit,
                  attributes: ["no_dtd", "no_daftar_terperinci", "nama"],
                },
                required: true
              },
              order: [[rlEmpatBSebabDetail, rlEmpatJenisGolPenyakit, "no", "ASC"]],
            })
            .then((resultRL) => {
              res.status(200).send({
                status: true,
                message: "data found",
                dataRS: results,
                data: resultRL
              });
            })
            .catch((err) => {
              res.status(422).send({
                status: false,
                message: err,
              });
              return;
            });
          })
          .catch((err) => {
            res.status(422).send({
              status: false,
              message: err,
            });
            return;
          });
      } else if(req.user.jenis_user_id == 3){
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                kab_kota_id : req.user.rsId
            }
          })
            .then((results) => {
              const getkoders = results.dataValues.Propinsi;
              rlEmpatBSebabHeader
              .findAll({
                attributes: ["rs_id", "tahun"],
                where: {
                  rs_id: getkoders,
                  tahun: req.query.tahun,
                },
                include: {
                  model: rlEmpatBSebabDetail,
                  include: {
                    model: rlEmpatJenisGolPenyakit,
                    attributes: ["no_dtd", "no_daftar_terperinci", "nama"],
                  },
                  required: true
                },
                order: [[rlEmpatBSebabDetail, rlEmpatJenisGolPenyakit, "no", "ASC"]],
              })
              .then((resultRL) => {
                res.status(200).send({
                  status: true,
                  message: "data found",
                  dataRS: results,
                  data: resultRL
                });
              })
              .catch((err) => {
                res.status(422).send({
                  status: false,
                  message: err,
                });
                return;
              });
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