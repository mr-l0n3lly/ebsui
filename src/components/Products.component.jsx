import Reac from 'react'
import { Link } from 'react-router-dom'

const Products = ({products, deleteHandler}) => {


	return (
		<>
			<div>
				<div className="page-header">
					<h1 className="pb-3">{products.length} products</h1>
				</div>
				<div className="comments-list">
					{
						products.length ? products.sort((a, b) => {
							return new Date(b['created_at']) - new Date(a['created_at'])
						}).map((item, index) => {
							return (
								<div className="media border p-4 mb-4" key={index}>
									<p className=""><small>{item['created_at']}</small></p>
									<div className="media-body">

										<h4 className="media-heading user_name">{item['product_title']}</h4>
										<p>{item['product_desc']}</p>

										<Link to={'/product/' + item['product_id']} className="btn btn-success">
											View
										</Link>


										<button onClick={deleteHandler} value={item['product_id']} type="button"
										        className="btn btn-danger m-4">Delete
										</button>
									</div>
									<p className=""><small>{item['product_price']}$</small></p>
								</div>
							)
						}) : null
					}
				</div>
			</div>
		</>
	)
}

export default Products