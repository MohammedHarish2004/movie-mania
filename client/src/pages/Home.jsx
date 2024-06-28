import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

export default function Home() {
  const [slider, setSlider] = useState([]);
  const [slider2, setSlider2] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [epicAnimes, setEpicAnimes] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user); 

  const fetchMovies = async () => {
    setLoading(true);
    const res = await fetch(`/api/slider/getSlider?random=true&limit=5`);
    const data = await res.json();
    setSlider(data.sliders);
    setLoading(false);
  };

  const fetchMovies2 = async () => {
    setLoading(true);
    const res = await fetch(`/api/slider/getSlider?random=true&limit=5&page=2`);
    const data = await res.json();
    setSlider2(data.sliders);
    setLoading(false);
  };

  const fetchTrending = async () => {
    setLoading(true);
    const res = await fetch(`/api/movie/getMovie?trending=true`);
    const data = await res.json();
    setTrending(data.movies);
    setLoading(false);
  };

  const fetchNewRelease = async () => {
    setLoading(true);
    const res = await fetch(`/api/movie/getMovie?newRelease=true`);
    const data = await res.json();
    setNewRelease(data.movies);
    setLoading(false);
  };

  const fetchTopMovies = async () => {
    setLoading(true);
    const res = await fetch(`/api/movie/getMovie?theme=movie&limit=6&random=true`);
    const data = await res.json();
    setTopMovies(data.movies);
    setLoading(false);
  };

  const fetchEpicAnimes = async () => {
    setLoading(true);
    const res = await fetch(`/api/movie/getMovie?theme=anime&limit=6&random=true`);
    const data = await res.json();
    setEpicAnimes(data.movies);
    setLoading(false);
  };

  const fetchPopularSeries = async () => {
    setLoading(true);
    const res = await fetch(`/api/movie/getMovie?theme=series&limit=6&random=true`);
    const data = await res.json();
    setPopularSeries(data.movies);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
    fetchMovies2();
    fetchTrending();
    fetchNewRelease();
    fetchTopMovies();
    fetchEpicAnimes();
    fetchPopularSeries();
  }, []);

  useEffect(() => {
    if (slider.length > 0) {
      const sliderCarousel = $('.slider-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 },
        },
      });

      return () => {
        if (sliderCarousel.data('owl.carousel')) {
          sliderCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          sliderCarousel.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [slider]);

  useEffect(() => {
    if (slider2.length > 0) {
      const sliderCarousel2 = $('.slider-carousel-2').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 },
        },
      });

      return () => {
        if (sliderCarousel2.data('owl.carousel')) {
          sliderCarousel2.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          sliderCarousel2.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [slider2]);

  useEffect(() => {
    if (trending.length > 0 || newRelease.length > 0) {
      const trendingCarousel = $('.trending-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        dots:false,
        responsive: {
          0: { items: 3 },
          600: { items: 4 },
          1000: { items: 5 },
        },
      });

      return () => {
        if (trendingCarousel.data('owl.carousel')) {
          trendingCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          trendingCarousel.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [trending]);

  
  useEffect(() => {
    if (newRelease.length > 0) {
      const newReleaseCarousel = $('.newRelease-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        dots:false,
        responsive: {
          0: { items: 3 },
          600: { items: 4 },
          1000: { items: 5 },
        },
      });

      return () => {
        if (newReleaseCarousel.data('owl.carousel')) {
          newReleaseCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          newReleaseCarousel.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [newRelease]);

  useEffect(() => {
    if (topMovies.length > 0) {
      const topMoviesCarousel = $('.topMovies-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        dots:false,
        responsive: {
          0: { items: 3 },
          600: { items: 4 },
          1000: { items: 5 },
        },
      });

      return () => {
        if (topMoviesCarousel.data('owl.carousel')) {
          topMoviesCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          topMoviesCarousel.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [topMovies]);
 
  useEffect(() => {
    if (epicAnimes.length > 0) {
      const epicAnimesCarousel = $('.epicAnime-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        dots:false,
        responsive: {
          0: { items: 3 },
          600: { items: 4 },
          1000: { items: 5 },
        },
      });

      return () => {
        if (epicAnimesCarousel.data('owl.carousel')) {
          epicAnimesCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          epicAnimesCarousel.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [epicAnimes]);

  useEffect(() => {
    if (popularSeries.length > 0) {
      const popularSeriesCarousel = $('.popularSeries-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        margin: 5,
        nav: false,
        dots:false,
        responsive: {
          0: { items: 3 },
          600: { items: 4 },
          1000: { items: 5 },
        },
      });

      return () => {
        if (popularSeriesCarousel.data('owl.carousel')) {
          popularSeriesCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          popularSeriesCarousel.find('.owl-stage-outer').children().unwrap();
        }
      };
    }
  }, [popularSeries]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl' color='warning'/>
      </div>
    );
  }

  return (
    <div>
      {/* Slider */}
      <div className='slider-carousel owl-carousel z-30'>
        {slider.length > 0 ? slider.map((movie) => (
          <div className='item relative bg-black' key={movie._id}>
            <img src={movie.image} alt="movie poster" className='w-full h-[200px] md:h-[400px] lg:h-[550px] object-fill' />
            <div className='absolute inset-0 bg-black  backdrop-blur opacity-30'></div>
            <div className='flex flex-col gap-0.5 absolute bottom-[2%] p-4 z-10'>
              <h1 className='text-base sm:text-3xl lg:text-5xl font-medium truncate capitalize text-white'>{movie.name} | {movie.theme}</h1>
              <div className='text-xs lg:text-xl line-clamp-3 flex gap-2 text-gray-300 font-medium truncate mt-0 md:mt-2'>
                <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                <span>{movie.year}</span>
                <span>{movie.age}+</span>
                <span>{movie.theme ==='movie' ? movie.duration + 'mins' : movie.duration + '+'}</span>
              </div>
              <div className='text-xs w-52 sm:w-80 lg:w-full lg:max-w-3xl lg:text-xl text-gray-300 font-medium truncate text-wrap line-clamp-2 lg:line-clamp-2'>
                <span>{movie.description}</span>
              </div>
              <Link to={`/view?movieUrl=${encodeURIComponent(movie.url)}`}  className='w-20 md:w-52 border-2 border-yellow-300 hover:bg-yellow-300 hover:text-black font-bold text-white p-1 lg:p-2 rounded-lg transition delay-50 mt-3 uppercase flex gap-2 items-center justify-center px-1 lg:px-4 text-xs sm:text-base'>
                Play <FaPlay className='w-2 h-2 sm:w-3 sm:h-3' />
              </Link>
            </div>
          </div>
        )) : <span>No movies available</span>}
      </div>
      {/* Slider end */}

      {/* Trending movies */}
      <div className='trending-carousel owl-carousel z-30'>
        {trending.length > 0 ? trending.map((movie) => (
          <div className='item overflow-hidden' key={movie._id}>
            <Link to={`/details/${movie._id}`} className='block overflow-hidden'>
              <img src={movie.image} alt="movie poster" className='h-[150px] md:h-[220px] lg:h-[300px] transform transition-transform duration-300 ease-in-out hover:scale-105' />
              <div className='bg-black p-2'>
                <h1 className='font-medium truncate'>{movie.name} | {movie.theme}</h1>
                <div className='flex gap-2 text-gray-500 text-sm font-medium truncate'>
                  <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                  <span>{movie.year}</span>
                  <span>{movie.age}+</span>
                </div>
              </div>
            </Link>
          </div>
        )) : <span>No movies available</span>}
      </div>
      {/* Trending movies End */}

      {/* Epic animes */}
      <h1 className='text-xl md:text-3xl my-5 ms-1 topic '>Epic Animes</h1>
      <div className='epicAnime-carousel owl-carousel'>
        {epicAnimes.length > 0 ? epicAnimes.map((movie) => (
          <div className='item overflow-hidden' key={movie._id}>
            <Link to={`/details/${movie._id}`} className='block overflow-hidden'>
              <img src={movie.image} alt="movie poster" className='h-[150px] md:h-[220px] lg:h-[300px] transform transition-transform duration-300 ease-in-out hover:scale-105' />
              <div className='bg-black p-2'>
                <h1 className='font-medium truncate'>{movie.name} | {movie.theme}</h1>
                <div className='flex gap-2 text-gray-500 text-sm font-medium truncate'>
                  <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                  <span>{movie.year}</span>
                  <span>{movie.age}+</span>
                </div>
              </div>
            </Link>
          </div>
        )) : <span>No animes available</span>}
      </div>
      {/* Epic animes End */}

      {/* Top movies */}
      <h1 className='text-xl md:text-3xl my-5 ms-1 topic'>Top Movies</h1>
      <div className='topMovies-carousel owl-carousel'>
        {topMovies.length > 0 ? topMovies.map((movie) => (
          <div className='item overflow-hidden' key={movie._id}>
            <Link to={`/details/${movie._id}`} className='block overflow-hidden'>
              <img src={movie.image} alt="movie poster" className='h-[150px] md:h-[220px] lg:h-[300px] transform transition-transform duration-300 ease-in-out hover:scale-105' />
              <div className='bg-black p-2'>
                <h1 className='font-medium truncate'>{movie.name} | {movie.theme}</h1>
                <div className='flex gap-2 text-gray-500 text-sm font-medium truncate'>
                  <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                  <span>{movie.year}</span>
                  <span>{movie.age}+</span>
                </div>
              </div>
            </Link>
          </div>
        )) : <span>No movies available</span>}
      </div>
      {/* Top movies End */}

      {/* Slider */}
      <div className='slider-carousel-2 owl-carousel z-30'>
        {slider2.length > 0 ? slider2.map((movie) => (
          <div className='item relative bg-black' key={movie._id}>
            <img src={movie.image} alt="movie poster" className='w-full h-[200px] md:h-[400px] lg:h-[550px] object-fill' />
            <div className='absolute inset-0 bg-black  backdrop-blur opacity-30'></div>
            <div className='flex flex-col gap-0.5 absolute bottom-[2%] p-4 z-10'>
              <h1 className='text-base sm:text-3xl lg:text-5xl font-medium truncate capitalize text-white'>{movie.name} | {movie.theme}</h1>
              <div className='text-xs lg:text-xl line-clamp-3 flex gap-2 text-gray-300 font-medium truncate mt-0 md:mt-2'>
                <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                <span>{movie.year}</span>
                <span>{movie.age}+</span>
                <span>{movie.theme ==='movie' ? movie.duration + 'mins' : movie.duration + '+'}</span>
              </div>
              <div className='text-xs w-52 sm:w-80 lg:w-full lg:max-w-3xl lg:text-xl text-gray-300 font-medium truncate text-wrap line-clamp-2 lg:line-clamp-2'>
                <span>{movie.description}</span>
              </div>
              <Link to={`/view?movieUrl=${encodeURIComponent(movie.url)}`}  className='w-20 md:w-52 border-2 border-yellow-300 hover:bg-yellow-300 hover:text-black font-bold text-white p-1 lg:p-2 rounded-lg transition delay-50 mt-3 uppercase flex gap-2 items-center justify-center px-1 lg:px-4 text-xs sm:text-base'>
                Play <FaPlay className='w-2 h-2 sm:w-3 sm:h-3' />
              </Link>
            </div>
          </div>
        )) : <span>No movies available</span>}
      </div>
      {/* Slider end */}

      {/* Popular series */}
      <h1 className='text-xl md:text-3xl my-5 ms-1 topic'>Popular Series</h1>
      <div className='popularSeries-carousel owl-carousel'>
        {popularSeries.length > 0 ? popularSeries.map((movie) => (
          <div className='item overflow-hidden' key={movie._id}>
            <Link to={`/details/${movie._id}`} className='block overflow-hidden'>
              <img src={movie.image} alt="movie poster" className='h-[150px] md:h-[220px] lg:h-[300px] transform transition-transform duration-300 ease-in-out hover:scale-105' />
              <div className='bg-black p-2'>
                <h1 className='font-medium truncate'>{movie.name} | {movie.theme}</h1>
                <div className='flex gap-2 text-gray-500 text-sm font-medium truncate'>
                  <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                  <span>{movie.year}</span>
                  <span>{movie.age}+</span>
                </div>
              </div>
            </Link>
          </div>
        )) : <span>No series available</span>}
      </div>
      {/* Popular series End */}

      {/* New Released movies */}
      <h1 className='text-xl md:text-3xl my-5 ms-1 topic'>New Released</h1>
      <div className='newRelease-carousel owl-carousel'>
        {newRelease.length > 0 ? newRelease.map((movie) => (
          <div className='item overflow-hidden' key={movie._id}>
            <Link to={`/details/${movie._id}`} className='block overflow-hidden'>
              <img src={movie.image} alt="movie poster" className='h-[150px] md:h-[220px] lg:h-[300px] transform transition-transform duration-300 ease-in-out hover:scale-105' />
              <div className='bg-black p-2'>
                <h1 className='font-medium truncate'>{movie.name} | {movie.theme}</h1>
                <div className='flex gap-2 text-gray-500 text-sm font-medium truncate'>
                  <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                  <span>{movie.year}</span>
                  <span>{movie.age}+</span>
                </div>
              </div>
            </Link>
          </div>
        )) : <span>No movies available</span>}
      </div>
      {/* New Released movies End */}

      {/* Notice */}
      <CallToAction />
    </div>
  );
}
