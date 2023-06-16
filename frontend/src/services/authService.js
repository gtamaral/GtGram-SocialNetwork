import {api, requestConfig} from '../utils/config';

//register an user
const register = async(data) => {

    const config = requestConfig("POST", data)

    try {

        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err);

        //only save if have a id
        if(res._id) {
            localStorage.setItem("user", JSON.stringify(res));
        }
         
      return res;
    } catch (error) {
        console.log(error)
    }
};

//logout
const logout = () => {
  localStorage.removeItem("user")
}

//sign and user
const login = async(data) => {

    const config = requestConfig("POST", data)

    try {

        const res = await fetch(api + "/users/login", config)
        .then((res) => res.json())
         .catch((err) => err)
        
        //only save in localStorage if have id
        if(res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }
      return res;
    } catch (error) {
        console.log(error)
    }

}

const authService = {
    register,
    logout,
    login,

};

export default authService;

// const register = async (data) => {
//     const config = requestConfig("POST", data);
  
//     try {
//       const response = await fetch(api + "/users/register", config);
//       const responseData = await response.json();
  
//       if (response.ok) {
//         localStorage.setItem("user", JSON.stringify(responseData));
//         return responseData; // retorna somente os dados necessários
//       } else {
//         throw new Error("Failed to register user"); // lança um erro personalizado
//       }
//     } catch (error) {
//       console.log(error);
//       throw error; // lança o erro para que possa ser tratado em outro lugar
//     }
//   };
  
//   const authService = {
//     register,
//   };
  
//   export default authService;
  
