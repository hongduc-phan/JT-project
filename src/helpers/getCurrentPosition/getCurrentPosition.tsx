function getCurrentPosition(
  options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0,
  },
): false | Promise<Position> {
  if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos);
        },
        (err) => {
          reject(err);
        },
        options,
      );
    });
  } else {
    return false;
  }
}

export default getCurrentPosition;
