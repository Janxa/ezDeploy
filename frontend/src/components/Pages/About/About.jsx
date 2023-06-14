function About() {
	return (
		<main className="mt-28 md:mt-32 w-11/12 m-auto flex  flex-col">
			<h3 className="bg-flat-700  w-4/5 md:w-1/2 lg:w-11/12 mx-auto text-2xl p-2 font-bold text-center  shadow-md rounded-md m-2">
				Hello and welcome to my demo content delivery app!
			</h3>
			<div className="bg-flat-700 flex flex-col h-full   w-4/5  md:w-1/2 lg:w-11/12  overflow-hidden  mx-auto p-4 shadow-md rounded-md">
				<p className="">
					This project serves as a showcase for my React and Flask skills. The
					app provides a seamless and efficient deployment process for
					user-built static websites by utilizing AWS S3 buckets.
				</p>
				<p className="mt-4">
					Key Features:
					<ul>
						<li className="mt-2">
							<b className="text-indigo-400">Streamlined Deployment:</b> Users
							can easily upload their static websites to an AWS S3 bucket,
							enabling quick and hassle-free deployment.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">Security Measures:</b> The app
							implements multiple layers of security and file checks to prevent
							the uploading of invalid or oversized files.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">User System: </b>Comprehensive user
							system that enables account creation using email addresses and
							encrypted passwords. Email needs to be verified before the first
							connection.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">Contact Form:</b> The app includes
							a fully functional contact form, allowing users to easily get in
							touch with me for any inquiries or feedback they may have.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">Scalability with Celery:</b> By
							utilizing Celery, a distributed task queue system, the app
							efficiently handles multiple asynchronous tasks simultaneously.
							This scalability ensures smooth performance even during high usage
							periods.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">MySQL Database:</b> User's data are
							stored in a MySQL Database powered by the sqlAlchemy ORM.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">Real-Time Notifications:</b> To
							keep users informed about the uploading process, the server sends
							real-time notifications using Server-Sent Events (SSE). This
							feature allows users to stay updated on the progress of their
							uploads.
						</li>
						<li className="mt-4">
							<b className="text-indigo-400">Enhanced Authentication: </b> JWT
							(JSON Web Tokens) are used for authentication, providing a secure
							and efficient method for user verification. I have implemented
							double submit verification to further enhance the security of the
							authentication process.
						</li>{" "}
						<li className="mt-4">
							<b className="text-indigo-400">Responsive: </b> Even though the
							app isn't meant to be used on mobile devices, you can still access
							all of its features on your phone through its responsive design.
						</li>
					</ul>
				</p>
			</div>
			<div className="bg-flat-700 flex flex-col h-full mt-4  w-4/5  md:w-1/2 lg:w-11/12  overflow-hidden  mx-auto p-4 shadow-md rounded-md">
				<p className="">
					<b className="text-xl text-chili-500 underline">Please note :</b>
					<span className="ml-1">
						this app is purely a demonstration of my programming abilities and
						is
					</span>
					<b className="ml-1 text-chili-500  ">
						not intended for commercial purposes{" "}
					</b>
					. As hosting websites on AWS incurs costs, the default accounts do not
					have access to the AWS upload feature. However, if you would like to
					test the full functionality of the app, please send an email to
					<a
						href="mailto: bauer.maxime@outlook.fr"
						className="text-indigo-600 underline font-medium"
					>
						{" "}
						bauer.maxime@outlook.fr
					</a>
					, and I will provide you with the necessary permissions.
				</p>
			</div>
		</main>
	);
}

export default About;
