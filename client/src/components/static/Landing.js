import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundVideo from './BackgroundVideo/BackgroundVideo'
function Landing(){
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large' style={{ textAlignLast: 'center' }}>
						Travellers Camp
					</h1>
					<p className='lead' style={{ textAlignLast: 'center' }}>
						Join our community, share posts and get to know about many Travel Destinations
						shared by other Travellers
					</p>
					<div className='buttons'>
						<Link to="/api/user/register" className="btn btn-outline-info">
							Sign Up
						</Link>

						<Link to="/api/user/login" className="btn btn-outline-info">
							Sign In
						</Link>
                        <BackgroundVideo />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Landing