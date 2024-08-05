let guestSessinId = null;
const bearer =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTQ4MDE5OWQ2NmZhNDFjNTBhNzcyZjdlZTA5ZTJmNiIsIm5iZiI6MTcyMDg3MDE4Ni40Mzg0MDcsInN1YiI6IjY2OGNmZWVlYjhmM2IzMzAzNDJiYzNhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0nyDMZWR4sHBYsiLBwaZfj1F2SxtjU21AfRp5Y-nu5w';

export function getMovie(numberPage = 1, seachValue = 'return') {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${seachValue}&include_adult=false&language=en-US&page=${numberPage}`,
    {
      headers: {
        Authorization: bearer,
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Error get movie');
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
}

export function getGenres() {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
    headers: {
      Authorization: bearer,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Error');
      }
    })
    .then((res) => res.genres)
    .catch((err) => {
      console.log(err);
      throw new Error('Error');
    });
}

export function guestSession() {
  return fetch(`https://api.themoviedb.org/3/authentication/guest_session/new`, {
    headers: {
      Authorization: bearer,
    },
  })
    .then((res) => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Error');
      }
    })
    .then((data) => (guestSessinId = data.guest_session_id))
    .catch((err) => {
      console.log(err);
      throw new Error('Error');
    });
}

export function guestSessionGetRate(numberPage = 1) {
  return fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessinId}/rated/movies?language=en-US&page=${numberPage}&sort_by=created_at.asc`,
    {
      headers: {
        Authorization: bearer,
      },
    }
  )
    .then((res) => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Error');
      }
    })
    .catch((err) => {
      return [];
    });
}

export function guestSessionAddRate(movieId, rate) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessinId}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: bearer,
    },
    body: JSON.stringify({ value: rate }),
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Error');
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error('Error');
    });
}
