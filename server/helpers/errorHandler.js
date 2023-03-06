// error handler
export const requestErrorHandler = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        } catch (err) {
            // expressのエラー処理ミドルウェアに移る
            next(err)
        }
    }
}