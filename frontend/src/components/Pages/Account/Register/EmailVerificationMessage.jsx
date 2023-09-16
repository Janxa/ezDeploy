import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
function EmailVerificationMessage({
	email,
	resendEmail,
	timer,
	resend = false,
}) {
	return (
		<div className="flex flex-col bg-flat-700 items-center rounded-md text-center">
			<p className="py-4 w-full rounded-t-md  bg-chili-500 ">
				<b className="text-2xl  ">Confirm your email adress </b>
			</p>
			<div className="m-4 pt-2 gap-4 flex flex-col justify-center items-center ">
				<p>
					{resend ? false : "You've successfully registered !"} To complete the
					registration process, please check the mail we sent at your adress :
				</p>
				<p className="rounded-md px-3 py-2  bg-lila-100">
					<FontAwesomeIcon icon={faEnvelope} className=" text-lila-500 " />
					<b className="text-lila-500  "> {email}</b>.
				</p>
				<p>
					We've sent you an important message with further instructions. It
					contains all the details you need to get started
				</p>
				<p className="underline underline-offset-2 font-bold ">
					Dont forget to check your spams.
				</p>
				<p className="text-sm p-4  text-lila-200    ">
					Nothing in your inbox ?
					<button
						onClick={resendEmail}
						disabled={timer > 0 ? true : false}
						className={`pl-2 underline decoration-dashed ${
							timer > 0
								? "text-neutral-400 cursor-default"
								: "text-lila-300 hover:text-lila-100 font-bold "
						} transition-all ease-in-out duration-200`}
					>
						Resend email {timer > 0 ? `(${timer}) ` : false}
					</button>
				</p>
			</div>
		</div>
	);
}

export default EmailVerificationMessage;
