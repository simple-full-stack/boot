import { Request, Response } from 'express';

interface FieldError {
    dataPath: string;
    message: string;
}

export default class HTTPContext {
    private req: Request;
    private res: Response;

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    fieldsError(errors: FieldError) {
        this.res.status(400).json({ fields: errors });
    }

    globalError(error: string | object) {
        this.res.status(400).json({ global: error });
    }

    data(data: any) {
        this.res.status(200).json({ data });
    }
}
