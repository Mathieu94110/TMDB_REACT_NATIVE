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
import { AirbnbRating } from "react-native-ratings";

class MoviesDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      film: undefined,
      isLoading: true,
    };
  }
  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(
      (item) => item.id === this.props.route.params.idFilm
    );
    if (favoriteFilmIndex !== -1) {
      // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex],
      });
      return;
    }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true });
    getFilmDetailFromApi(this.props.route.params.idFilm).then((data) => {
      this.setState({
        film: data,
        isLoading: false,
      });
    });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
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
    return <Image style={styles.logo} source={sourceImage} />;
  }

  render() {
    const { film } = this.state;
    return (
      <View style={styles.container}>
        {this.state.film ? (
          <View>
            <Image
              style={styles.image}
              source={{ uri: getImageFromApi(film.backdrop_path) }}
            />
            <View>
              <Text>{film.title}</Text>
            </View>
            <View style={styles.appreciation}>
              <TouchableOpacity
                style={styles.logo_container}
                onPress={() => this._toggleFavorite()}
              >
                {this._displayFavoriteImage()}
              </TouchableOpacity>

              <AirbnbRating
                style={styles.logo_container}
                count={5}
                reviews={[
                  "Terrible",
                  "Bad",
                  "Meh",
                  "OK",
                  "Good",
                  "Hmm...",
                  "Very Good",
                  "Wow",
                  "Amazing",
                  "Unbelievable",
                  "Jesus",
                ]}
                defaultRating={11}
                size={20}
              />
            </View>
            <View>
              <Text>{film.overview}</Text>
            </View>
            <View>
              <Text>{film.release_date}</Text>
            </View>
            <View>
              <Text>{film.vote_average}</Text>
            </View>
            <View>
              <Text>{film.buget}</Text>
            </View>
            <View>
              {film.production_companies &&
                film.production_companies.map((company, index) => (
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
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appreciation: {
    flexDirection: "row",
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return { favoritesFilm: state.favoritesFilm };
};

export default connect(mapStateToProps)(MoviesDetails);
