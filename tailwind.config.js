module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        video: "9fr 2fr",
      },
      screens: {
        800: "800px",
        400: "400px",
      },
      fontFamily: {
        sans: "Roboto , sans-serif",
      },
      colors: {
        bar: "#B3B3B3",
        g9: "#404040",
        g1: "#f7f7f7",
      },
    },
  },
  plugins: [],
};
