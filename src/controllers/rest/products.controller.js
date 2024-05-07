import { ERROR_TYPE, newError } from '../../errors/errors.js'
import { productsService } from '../../services/products.service.js'
import { uploadFile } from '../../services/s3.js'

export async function postController(req, res, next) {
    const body = req.body
    try {
        const pojo = await productsService.add(body)
        res['newProduct']()
        res.status(201).json(pojo)
    } catch (error) {
        next(error)
    }
}


export async function getController(req, res, next) {
    const {page = 1,limit = 10, sort, ...query} = req.query
    const options = {page, limit}
    if (sort)
      options.sort = {price: sort}

    try {
        const {docs: payload, prevPage, nextPage,  ...rest} = await productsService.paginate(query, options)
        const response = {
            status: 'success',
            payload,
            ...rest,
            prevLink: rest.hasPrevPage ? `/products?page=${rest.page-1}&limit=${rest.limit}` : null,
            nextLink: rest.hasNextPage ? `/products?page=${rest.page+1}&limit=${rest.limit}` : null,
        }
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export async function getByIdController(req, res, next) {
    const id = req.params.id
    console.log(process.env.NODE_ENV)
    try {
        const pojo = await productsService.findById({_id: id})
        res.json(pojo)
    } catch (error) {
        next(error)
    }
}

export async function updateController(req, res, next) {
    const id = req.params.id
    const fields = req.body
    try {
        const actualizado = await productsService.findByIdAndUpdate(id, {$set: fields}, { new: true})
        if (!actualizado){
            throw newError({...ERROR_TYPE.NOT_FOUND });
        }
        res.json({actualizado})
    } catch (error) {
        next(error)
    }
}

export async function deleteController(req, res, next) {
    const id = req.params.id
    try {
        const pojo = await productsService.findByIdAndDelete(id)
        if (!pojo){
            throw newError({...ERROR_TYPE.NOT_FOUND });
        }
        res['newProduct']()
        res.json(pojo)
    } catch (error) {
        next(error)
    }
}

export async function uploadController(req, res, next) {
    console.log({'req.body': req.body})
    console.log({'req.file': req.file})
    try {
        await uploadFile(req.file.originalname, req.file.buffer, req.file.mimetype)
        res.status(200).json("upload sucessful");
    } catch (error) {
        next(error)
    }


}