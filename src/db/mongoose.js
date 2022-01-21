const mongoose = require("mongoose");
const keys = require("../../config/keys");

mongoose.connect(`mongodb+srv://RL20:${keys.CONNECT_PASS}@general.fsc8g.mongodb.net/bank?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
});
