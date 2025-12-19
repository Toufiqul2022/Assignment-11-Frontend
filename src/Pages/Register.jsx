import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser, handleGoogleSignIn } =
    useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const blood = e.target.blood.value;
    const photoFile = e.target.PhotoUrl.files[0];

    // Password validation
    if (password.length < 6)
      return toast.warning("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return toast.warning("Password must contain an uppercase letter");
    if (!/[a-z]/.test(password))
      return toast.warning("Password must contain a lowercase letter");
    if (!/[0-9]/.test(password))
      return toast.warning("Password must contain a number");

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", photoFile);

      const uploadRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=08e5b231ab2fe3f893b40a2ca856d6d1",
        formData
      );

      const imgURL = uploadRes.data.data.display_url;

      // Create user
      const result = await registerWithEmailPassword(email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imgURL,
      });

      setUser(result.user);

      // Save user to DB
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        photoURL: imgURL,
        blood,
        district: selectedDistrict,
        upazila: selectedUpazila,
        createdAt: new Date(),
      });

      toast.success("Account Registered Successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };


  const googleSignUp = () => {
    handleGoogleSignIn()
      .then((result) => {
        setUser(result.user);

        axios.post("http://localhost:5000/users", {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
        });

        toast.success("Signed in with Google!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>

        <div className="card bg-base-100 w-full max-w-2xl shadow-2xl">
          <ToastContainer />
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-2">
                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="name"
                  placeholder="Your Full Name"
                  required
                />

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  name="email"
                  placeholder="Email"
                  required
                />

                {/* Photo */}
                <label className="label">Photo</label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  name="PhotoUrl"
                  required
                />

                {/* Blood Group */}
                <label className="label">Blood Group</label>
                <select
                  name="blood"
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>

                {/* District */}
                <label className="label">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedUpazila("");
                  }}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Your District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>

                {/* Upazila */}
                <label className="label">Upazila</label>
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Your Upazila</option>
                  {upazilas
                    .filter((u) => u.district_id === selectedDistrict)
                    .map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                </select>

                {/* Password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  name="password"
                  placeholder="Password"
                  required
                />

                {/* Google */}
                <button
                  type="button"
                  onClick={googleSignUp}
                  className="btn btn-outline mt-2"
                >
                  <span className="mr-2">Sign in with</span> <FcGoogle />
                </button>

                {/* Login */}
                <Link to="/login" className="text-sm mt-2">
                  Already have an account?{" "}
                  <span className="text-blue-600">Login</span>
                </Link>

                {/* Submit */}
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
