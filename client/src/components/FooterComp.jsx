import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsGithub, BsYoutube } from 'react-icons/bs';
import { PiFilmReelFill } from 'react-icons/pi';
export default function FooterCom() {
  return (
    <Footer container className='bg-black  border-t-8 border-yellow-300 relative z-10'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='flex flex-col gap-4 w-full sm:flex-row sm:justify-between'>
        <div className='mt-4'>
          <Link to='/' className='text-lg sm:text-xl font-bold dark:text-white'>
            <div className="flex gap-1">
              <span className="flex items-center gap-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-bl p-1 px-4 rounded-lg text-3xl font-bold text-black">
                <PiFilmReelFill />Movie
              </span>
              <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">Mania</span>
            </div>
          </Link>
        </div>
        <div className='flex flex-wrap gap-12 sm:gap-8 mt-4'>
          <div>
            <Footer.Title title='Quick Links' className='text-gray-400'/>
            <Footer.LinkGroup col className='hover:focus:text-white'>
              <Link  to='/movies?theme=movie' >
                <span  className='text-white hover:text-yellow-300'>Entertainment</span>
              </Link>
              <Link to='/dashboard?tab=profile' >
                <span  className='text-white hover:text-yellow-300'>Dashboard</span>
              </Link>
              <Link to='/watch-later' >
                <span  className='text-white hover:text-yellow-300'>Watch Later</span>
              </Link>
            </Footer.LinkGroup>
          </div>
          
          <div>
            <Footer.Title title='Follow us' className='text-gray-400'/>
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://www.github.com/MohammedHarish2004'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='text-white hover:text-yellow-300'>Github</span>
              </Footer.Link>
              <Footer.Link 
                href='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHy65-nfm4JmgAAAY_3LTCI4vcc2EG0A1BG-iL0hm0IFcrwZ8aPPPQ4A0QeCp_nvKsKeXfYl2pRQByCoXj2zEBr-w_5Y3VZJsw-wtgZOP1L4Q-Fap30BPTqKJM_h6JWR9E1B8w=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmohammed-harris-8967842a9%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span  className='text-white hover:text-yellow-300'>LinkedIn</span>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title='Legal' className='text-gray-400'/>
            <Footer.LinkGroup col>
              <Footer.Link ><span className='text-white hover:text-yellow-300'>Privacy Policy</span></Footer.Link>
              <Footer.Link ><span className='text-white hover:text-yellow-300'>Terms &amp; Conditions</span></Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <Footer.Copyright 
          className='text-gray-400'
          by="Movie Mania"
          year={new Date().getFullYear()}
        />
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <Footer.Icon href='https://www.youtube.com/@JokerPandaaOfficial/featured' target='_blank' icon={BsYoutube} className='text-white hover:text-yellow-400' />
          <Footer.Icon href='https://github.com/MohammedHarish2004' target='_blank' icon={BsGithub} className='text-white hover:text-yellow-300' />
        </div>
      </div>
    </div>
  </Footer>
  
  
  );
}