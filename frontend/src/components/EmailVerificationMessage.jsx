function EmailVerificationMessage({email,resendEmail}) {
    return (
    <div className="flex flex-col items-center">
        <h3 className="font-medium text-2xl text-color-yellow-primary mb-4">Check your mailbox !</h3>
        <p className="mb-2">To verify your account, you need to click on the link  we sent to <b>{email}</b>.</p>
        <p className="underline underline-offset-2">Dont forget to check your spams.</p>
        <p className="text-sm mt-2 "> Nothing in your inbox ? <button onClick={resendEmail} className="font-medium  text-color-blue-primary underline decoration-dashed">Resend email</button> </p>
    </div>  );
}

export default EmailVerificationMessage;