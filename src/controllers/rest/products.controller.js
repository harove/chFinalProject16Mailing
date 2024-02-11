import { productsService } from '../../services/products.service.js'

export async function postController(req, res) {
    const body = req.body
    try {
        const pojo = await productsService.create(body)
        res['newProduct']()
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export async function getController(req, res) {
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
        res.json(error.message)
    }
}

export async function getByIdController(req, res) {
    const id = req.params.id
    try {
        const pojo = await productsService.findById({_id: id})
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function updateController(req, res) {
    const id = req.params.id
    const fields = req.body
    try {
        const actualizado = await productsService.findByIdAndUpdate(id, {$set: fields}, { new: true})
        if (!actualizado){
            res.status(404).json({message: 'usuario no encontrado'})
        }
        res.json({actualizado})
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function deleteController(req, res) {
    const id = req.params.id
    try {
        const pojo = await productsService.findByIdAndDelete(id)
        if (!pojo){
            res.status(404).json({message: 'usuario no encontrado'})
        }
        res['newProduct']()
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}
