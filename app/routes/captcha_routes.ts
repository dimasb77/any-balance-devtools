import express, {Router} from "express";
import log from '../../common/log';
import config from "../config";
import CaptchaApi from "../apis/CaptchaApi";
import bodyParser from "body-parser";

export default function(router: Router) {
    const r = express.Router({mergeParams: true});
    router.use('/captcha/:action', <any>bodyParser.urlencoded({extended: true}), r);

    const handler = async (req: any, res: any) => {
        try {
            let api = new CaptchaApi(req, res);
            await api.action(req.params.action);
        }catch(e){
            res.status(e.statusCode || 500).json({status: 'error', message: e.message});
            log.error("CaptchaApi error: " + e.message + '\n' + e.stack);
        }
    };

    r.route('/')
    	.get(handler)
        .post(handler);
};