
import jwt from 'jsonwebtoken';
const privateKey =  process.env.SECRET || 'furry'
export const generateToken = (userId) => {
 
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ userId }, privateKey, {
            expiresIn: '300d',
          }, (err, token) => {
              if (err) {
                console.log(err);
                reject(err);
              }else{
                resolve (token);
              }
          });
    })

}


