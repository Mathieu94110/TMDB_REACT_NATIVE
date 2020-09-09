import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
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
      <ScrollView style={styles.main_container}>
        {this.state.film ? (
          <View style={styles.main_container}>
            <Image
              style={styles.image}
              source={{ uri: getImageFromApi(film.backdrop_path) }}
            />
            <View>
              <Text style={styles.title_text}>{film.title}</Text>
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
                reviews={["Nul", "Pas terrible", "Moyen", "Bien", "Excellent"]}
                defaultRating={5}
                size={20}
              />
            </View>
            <View>
              <Text style={styles.secondary_titles}>Synopsis:</Text>
              <Text style={styles.overview}>{film.overview}</Text>
            </View>
            <View style={styles.details}>
              <View>
                <Text style={styles.secondary_titles}>Date de sortie :</Text>
                <Text> {film.release_date.split("-").reverse().join("/")}</Text>
              </View>
              <View>
                <Text style={styles.secondary_titles}>Note du public:</Text>
                <Text> {film.vote_average}/10</Text>
              </View>
              <View>
                <Text style={styles.secondary_titles}>Budget:</Text>
                <Text>{film.budget} $</Text>
              </View>
              <View>
                <Text style={styles.secondary_titles}>Production: </Text>
                {film.production_companies &&
                  film.production_companies.map((company, index) => (
                    <Text key={index}>{company.name}</Text>
                  ))}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text>Chargement en cours</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    margin: 5,
    fontStyle: "italic",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,

    flexWrap: "wrap",
    color: "#000000",
    textAlign: "center",
  },
  container: {
    margin: 10,
    flexDirection: "column",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  logo_container: {},
  logo: {
    width: 40,
    height: 40,
  },
  appreciation: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },

  overview: {
    color: "#666666",
  },
  details: {
    color: "#666666",
    fontStyle: "italic",
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  secondary_titles: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return { favoritesFilm: state.favoritesFilm };
};

export default connect(mapStateToProps)(MoviesDetails);
