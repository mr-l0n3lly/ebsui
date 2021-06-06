import React, { useEffect, useState } from 'react'
import Products from '../components/Products.component'
import { HOST } from '../env'

const HomePage = () => {
	const [prodName, setProdName] = useState('')
	const [prodDesc, setProdDesc] = useState('')
	const [prodPrice, setProdPrice] = useState(0)

	const [message, setMessage] = useState('')

	const [products, setProducts] = useState([])

	useEffect(() => {
		fetch(`${HOST}/products`, {
			method: 'GET',
		})
			.then(result => result.json())
			.then(products => setProducts(products.data))
	}, [message])


	const addHandler = (e) => {
		e.preventDefault()

		fetch(`${HOST}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				prodName,
				prodDesc,
				prodPrice,
			}),
		})
			.then(response => response.json())
			.then(data => {
				setTimeout(() => setMessage(''), 4000)
				setMessage(data)
			})
	}

	const deleteHandler = (e) => {
		e.preventDefault()
		const id = e.target.value

		fetch(`${HOST}/products/${id}`, {
			method: 'DELETE',
		})
			.then(response => response.json())
			.then(data => setMessage(data))
	}

	return (
		<>
			<div className="row">
				{
					message ? (
						<>
							<p className={message.status ? 'text-success' : 'text-danger'}>{message.message}</p>
						</>
					) : null
				}
			</div>
			<div className="row m-4">
				<form action="/products" method="post">
					<div className="form-group mb-4">
						<label htmlFor="prodName">Product Name</label>
						<input name="prodName" type="text" value={prodName} className="form-control" id="prodName"
						       placeholder="Enter product name" onChange={(e) => setProdName(e.target.value)} />
					</div>
					<div className="form-group mb-4">
						<label htmlFor="prodDesc">Product description</label>
						<input name="prodDesc" type="text" value={prodDesc} className="form-control" id="prodDesc"
						       placeholder="Enter product description" onChange={(e) => setProdDesc(e.target.value)} />
					</div>
					<div className="form-group mb-4">
						<label htmlFor="prodPrice">Product Price</label>
						<input name="prodPrice" type="number" min="0" value={prodPrice}
						       onChange={(e) => setProdPrice(e.target.value)} className="form-control" id="prodPrice"
						       placeholder="Enter product price" />
					</div>
					<button type="submit" className="btn btn-primary" onClick={addHandler}>Add</button>
				</form>
			</div>
			<div className="row m-4">
				<Products products={products} deleteHandler={deleteHandler}/>
			</div>
		</>
	)
}

export default HomePage
