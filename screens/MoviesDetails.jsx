import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { getImageFromApi, getFilmDetailFromApi } from "../API/TMDBApi";

import { connect } from "react-redux";

class MoviesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };
  }
  componentDidMount() {
    const filmId = this.props.route.params.filmId;
    getFilmDetailFromApi(filmId)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          film: response,
          isLoading: false,
        });
      })
      .catch((error) => console.error(error));
  }

  componentDidUpdate = () => {
    console.log("componentDidUpdate : ");
    console.log(this.props.favoritesFilm);
  };

  //action

  _toggleFavorite = () => {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  };

  _displayFavoriteImage() {
    var sourceImage = require("./images/ic_favorite_border.png");
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      // Film dans nos favoris
      sourceImage = require("./images/ic_favorite.png");
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.film ? (
          <View>
            <Image
              style={styles.image}
              source={{ uri: getImageFromApi(this.state.film.poster_path) }}
            />
            <View>
              <Text>{this.state.film.title}</Text>
            </View>

            <TouchableOpacity
              style={styles.logo_container}
              onPress={() => this._toggleFavorite()}
            >
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <View>
              <Text>{this.state.film.overview}</Text>
            </View>
            <View>
              <Text>{this.state.film.release_date}</Text>
            </View>
            <View>
              <Text>{this.state.film.vote_average}</Text>
            </View>
            <View>
              <Text>{this.state.film.buget}</Text>
            </View>
            <View>
              {this.state.film.production_companies.map((company, index) => (
                <Text key={index}>{company.name}</Text>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Text>Chargement en cours</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "column",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  logo_container: {
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
});

const mapStateToProps = (state) => {
  return { favoritesFilm: state.favoritesFilm };
};

export default connect(mapStateToProps)(MoviesDetails);
