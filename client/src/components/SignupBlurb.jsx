import React from 'react';

const SignupBlurb = ({ signup, addUser }) => (
  <div className="signup">
    <p className="signup_blurb">{'Don\'t have an account? Become a member to save & comment on articles!'}</p>
    <div tabIndex="-7" role="button" className={`signup_button ${signup ? 'signup_active' : ''}`} onKeyDown={() => {}} onClick={addUser}>SIGNUP</div>
  </div>
);

export default SignupBlurb;
