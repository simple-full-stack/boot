import { Request, Response } from 'express';
import IFieldError from 'sfs-common/types/IFieldError';

export default class HTTPContext {
    private req: Request;
    private res: Response;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    fieldsError(errors: IFieldError[]) {
        this.res.status(400).json({ fields: errors });
    }

    globalError(error: string | object) {
        this.res.status(400).json({ global: error });
    }

    data(data: any) {
        this.res.status(200).json({ data });
    }
}
