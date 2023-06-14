import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ColorPalet = () => {
	return (
		<div className="w-full flex ">
			<ul className="w-1/6">
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-chili-100">
					100
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-chili-200">
					200
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-chili-300">
					300
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-chili-400">
					400
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-chili-500">
					500
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-chili-600">
					600
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-chili-700">
					700
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-chili-800">
					800
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-chili-900">
					900
				</li>
			</ul>
			<ul className="w-1/6">
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-jade-100">
					100
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-jade-200">
					200
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-jade-300">
					300
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-jade-400">
					400
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-jade-500">
					500
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-jade-600">
					600
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-jade-700">
					700
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-jade-800">
					800
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-jade-900">
					900
				</li>
			</ul>
			<ul className="w-1/6">
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-lila-100">
					100
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-lila-200">
					200
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-lila-300">
					300
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-lila-400">
					400
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-lila-500">
					500
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-lila-600">
					600
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-lila-700">
					700
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-lila-800">
					800
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-lila-900">
					900
				</li>
			</ul>
			<ul className="w-1/6">
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-flat-100">
					100
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-flat-200">
					200
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-flat-300">
					300
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-flat-400">
					400
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-flat-500">
					500
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-flat-600">
					600
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-flat-700">
					700
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-flat-800">
					800
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-flat-900">
					900
				</li>
			</ul>
			<ul className="w-1/6">
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-golden-100">
					100
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-golden-200">
					200
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-golden-300">
					300
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-golden-400">
					400
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-golden-500">
					500
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-golden-600">
					600
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-golden-700">
					700
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-golden-800">
					800
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-golden-900">
					900
				</li>
			</ul>
			<ul className="w-1/6">
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-invalid-100">
					100
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-invalid-200">
					200
				</li>
				<li className=" h-12 text-center pt-3 text-black  text-xs bg-invalid-300">
					300
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-invalid-400">
					400
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-invalid-500">
					500
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-invalid-600">
					600
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-invalid-700">
					700
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-invalid-800">
					800
				</li>
				<li className=" h-12 text-center pt-3 text-white  text-xs bg-invalid-900">
					900
				</li>
			</ul>
		</div>
	);
};

export default ColorPalet;
