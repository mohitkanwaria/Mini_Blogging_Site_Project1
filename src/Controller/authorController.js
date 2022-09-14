// const { validate } = require("../models/authorModel")
const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")


//**************************************VALIDATION FUNCTIONS****************************** */

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

const isValidRequest = function (object) {
  return Object.keys(object).length > 0
}

const isValidEmail = function (value) {
  const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regexForEmail.test(value)
}

const regixValidator = function (value) {
  let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
  return regex.test(value)
}

//****************************************REGISTER NEW AUTHOR********************************* */

const createAuthor = async function (req, res) {
  try {
    let requestBody = req.body

    if (!isValidRequest(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "author data is required" });
    }
    //using desturcturing
    const { fname, lname, title, email, password } = requestBody;

    //requestBody should not have more than 5keys as per outhorSchema
    if (Object.keys(requestBody).length > 5) {
      return res.status(400).send({ status: false, message: "invalid data entry inside request body" })
    }

    if (!isValid(fname) || !regixValidator(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "first name is required or its should contain character" })
    }

    if (!isValid(lname) || !regixValidator(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "last name is required or its should contain character" })
    }

    if (!isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required" })
    }

    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title should contain Mr.,Mrs.,Miss" })
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" })
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email address" })
    }

    const isEmailUnique = await AuthorModel.findOne({ email: email })

    if (isEmailUnique) {
      return res
        .status(409)           //
        .send({ status: false, message: "Email already exits" });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" })
    }

    const authorData = {
      fname: fname.trim(),
      lname: lname.trim(),
      title: title.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    const newAuthor = await AuthorModel.create(authorData);
    res
      .status(201)
      .send({ status: true, message: "author registered successfully", data: newAuthor });


  } catch (err) {
    res.status(500).send({ err: err.message })

  }
}

//****************************AUTHOR LOGIN****************************** */

const authorLogin = async function (req, res) {
  try {

    const requestBody = req.body;
    const queryParams = req.query;

    if (isValidRequest(queryParams)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid request" });
    }

    if (!isValidRequest(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "data is required" });
    }

    const userName = requestBody.email;
    const password = requestBody.password;

    if (!isValidEmail(userName)) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid email address" });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" })
    }

    const author = await AuthorModel.findOne({
      email: userName,
      password: password
    });

    if (!author) {
      return res
        .status(404)
        .send({ status: false, message: "no author found " })
    }

    //creating a jsonWebToken and sending it to responce header and body

    let token = jwt.sign({
      authorId: author._id.toString()
    },
      "group18project1"
    );

    res.header("x-api-key", token);

    res
      .status(200)
      .send({ status: true, message: "Author Login Successfully", data: token })

  } catch (error) {

    res.status(500).send({ error: error.message })            //

  }
}

//**********************EXPORTING BOTH HANDLERS********************** */

module.exports = { createAuthor, authorLogin }