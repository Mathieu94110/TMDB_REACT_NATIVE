import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import FadeIn from "../Animations/FadeIn";

class FilmItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require("../screens/images/ic_favorite.png")}
        />
      );
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props;

    return (
      <FadeIn>
        <TouchableOpacity onPress={() => displayDetailForFilm(film.id)}>
          <View style={styles.card}>
            <View style={styles.main_container}>
              <Image
                source={{ uri: getImageFromApi(film.poster_path) }}
                style={styles.image}
              />
              <View style={styles.content_container}>
                <View style={styles.header_container}>
                  <Text style={styles.title_text}>{film.title}</Text>

                  {this._displayFavoriteImage()}
                  <Text style={styles.vote_text}>{film.vote_average}</Text>
                </View>

                <View style={styles.description_container}>
                  <Text style={styles.description_text} numberOfLines={6}>
                    {film.overview}
                  </Text>
                </View>
                <View style={styles.date_container}>
                  <Text style={styles.date_text}>
                    Sorti le {film.release_date.split("-").reverse().join("/")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: "black",

    borderWidth: 1,
  },
  main_container: {
    height: 190,

    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  favorite_image: {
    height: 40,
    width: 40,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});

export default FilmItem;
