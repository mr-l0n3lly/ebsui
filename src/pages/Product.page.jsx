import React, { useEffect, useState } from 'react'
import { HOST } from '../env'
import { Link } from 'react-router-dom'

const ProductPage = (props) => {
	let {id} = props.match.params

	const [prodName, setProdName] = useState('')
	const [prodDesc, setProdDesc] = useState('')
	const [prodPrice, setProdPrice] = useState(0)

	const [product, setProduct] = useState([])
	const [message, setMessage] = useState('')
	const [editForm, setEditForm] = useState(false)

	const modifyHandler = (e) => {
		e.preventDefault()

		fetch(`${HOST}/products/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				id,
				prodName,
				prodDesc,
				prodPrice,
			}),
		})
			.then(response => response.json())
			.then(data => {
				setMessage(data)
			})
	}

	useEffect(() => {
		if (id) {
			fetch(`${HOST}/products/${id}`, {
				method: 'GET',
			})
				.then(result => result.json())
				.then(data => {
					if (data.status) {
						setProdName(data.data[0]['product_title'])
						setProdDesc(data.data[0]['product_desc'])
						setProdPrice(data.data[0]['product_price'])
						setProduct(data.data)
					} else {
						setTimeout(() => {
							setMessage('')
						}, 5000)
						setMessage(data)
					}
				})
		}
	}, [id, message])

	return (
		<>
			{message.status && <p className={message.status ? 'text-success' : 'text-danger'}>{message.message}</p>}
			<br />
			{
				product.length ? (
					<>
						<h2>{product[0]['product_title']}</h2>
						<p>{product[0]['product_desc']}</p>
						<p>{product[0]['product_price']} $</p>

						<button
							className="btn btn-success"
							onClick={() => {
								setEditForm(!editForm)
							}}
							style={{
								marginRight: '20px',
							}}
						>
							Edit
						</button>

						<Link to={'/'} className="btn btn-success">
							Home
						</Link>
					</>
				) : null
			}

			{
				editForm ? (
					<>
						<div className="row mt-4">
							<form action="/products" method="put">
								<div className="form-group mb-4">
									<label htmlFor="prodName">Product Name</label>
									<input name="prodName" type="text" value={prodName} className="form-control"
									       id="prodName"
									       placeholder="Enter product name"
									       onChange={(e) => setProdName(e.target.value)} />
								</div>
								<div className="form-group mb-4">
									<label htmlFor="prodDesc">Product description</label>
									<input name="prodDesc" type="text" value={prodDesc} className="form-control"
									       id="prodDesc"
									       placeholder="Enter product description"
									       onChange={(e) => setProdDesc(e.target.value)} />
								</div>
								<div className="form-group mb-4">
									<label htmlFor="prodPrice">Product Price</label>
									<input name="prodPrice" type="number" min="0" value={prodPrice}
									       onChange={(e) => setProdPrice(e.target.value)} className="form-control"
									       id="prodPrice"
									       placeholder="Enter product price" />
								</div>
								<button type="submit" className="btn btn-primary" onClick={modifyHandler}>Apply</button>
							</form>
						</div>
					</>
				) : null
			}
		</>
	)
}

export default ProductPage