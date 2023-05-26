
import config from '../config/config'
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

async function googleVerify(token="") {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
  })
     const payload:any = ticket.getPayload();
  return {
     full_name: payload.name, 
     email: payload.email,
     img: payload.picture
  }
}

export default googleVerify
