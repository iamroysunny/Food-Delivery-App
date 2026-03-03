import userModel from '../models/userModels.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/* ================= TOKEN ================= */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

/* ================= USER LOGIN ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" })
    }

    const token = createToken(user._id)
    res.json({ success: true, message: "Login successful", token })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

/* ================= USER REGISTER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "User already exist" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" })
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)

    res.json({
      success: true,
      message: "Account created successfully",
      token
    })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

/* ================= ADMIN LOGIN (FIXED 100%) ================= */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { role: "admin", email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )

      return res.json({
        success: true,
        message: "Admin login successful",
        token
      })
    } else {
      return res.json({
        success: false,
        message: "Invalid login details"
      })
    }

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { loginUser, registerUser, adminLogin }
