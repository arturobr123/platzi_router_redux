import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../assets/styles/components/CarouselItem.scss';
import { Link } from 'react-router-dom';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import { setFavorite, deleteFavorite } from '../actions';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, setFavorite, mylist, deleteFavorite, isList } = props;

  const handleSetFavorite = () => {
    const exist = mylist.find(item => item.id === id);
    if (exist) {
      alert('Ya tienes agregado a favorito');
    } else {
      setFavorite({
        id,
        cover,
        title,
        year,
        contentRating,
        duration,
      });
    }
  };

  const handleDeleteFavorite = (itemId) => {
    deleteFavorite(itemId);
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>

          {isList ?
            <img className='carousel-item__details--img' src={removeIcon} alt='Plus Icon' onClick={() => handleDeleteFavorite(id)} /> :
            <img className='carousel-item__details--img' src={plusIcon} alt='Plus Icon' onClick={handleSetFavorite} />
          }

        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );

};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = {
  setFavorite, deleteFavorite,
};

const mapStateToProps = (state) => {
  return {
    mylist: state.mylist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
