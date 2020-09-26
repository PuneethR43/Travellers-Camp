import React from 'react'
import {Link} from 'react-router-dom'
import {HiArrowCircleRight} from "react-icons/hi"
import BackgroundVideo from './BackgroundVideo/BackgroundVideo'
function Home(){
    return(
        <div>
            <section className='home'>
			<div className='dark-overlay'>
				<div className='home-inner'>
					<h1 className='x-large' style={{ textAlignLast: 'center' }}>
						Travellers Camp
					</h1>
					<p className='lead' style={{ textAlignLast: 'center' }}>
						Join our community, share posts and get to know more about many Travel Destinations
						shared by other Travellers
					</p>
					<div className='buttons'>
						<Link to="/posts" className='btn btn-primary'>
							Go Ahead! <HiArrowCircleRight/>
						</Link>
					</div>
				</div>
				<BackgroundVideo />
			</div>
			
		</section>
		
        </div>
    )
}

export default Home