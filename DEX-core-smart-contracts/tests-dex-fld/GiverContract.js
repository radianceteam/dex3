const abi = {
	"ABI version": 2,
	"header": ["time", "expire"],
	"functions": [
		{
			"name": "sendTransaction",
			"inputs": [
				{"name":"dest","type":"address"},
				{"name":"value","type":"uint128"},
				{"name":"bounce","type":"bool"}
			],
			"outputs": [
			]
		},
		{
			"name": "getIncome",
			"inputs": [
				{"name":"sender","type":"address"}
			],
			"outputs": [
				{"name":"balance","type":"uint128"},
				{"name":"ts","type":"uint32[]"},
				{"name":"values","type":"uint128[]"}
			]
		},
		{
			"name": "getOutgoing",
			"inputs": [
				{"name":"receiver","type":"address"}
			],
			"outputs": [
				{"name":"balance","type":"uint128"},
				{"name":"ts","type":"uint32[]"},
				{"name":"values","type":"uint128[]"}
			]
		},
		{
			"name": "getBalance",
			"inputs": [
			],
			"outputs": [
				{"name":"balance","type":"uint128"}
			]
		},
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		}
	],
	"data": [
	],
	"events": [
	]
};

const pkg = {
    abi,
    imageBase64:'te6ccgECHQEABYAAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAib/APSkICLAAZL0oOGK7VNYMPShCAQBCvSkIPShBQIJngAAAAYHBgA1TtRNDT/9M/0wD0BPQF+Gv4an/4Yfhm+GP4YoADdfhCyMv/+EPPCz/4Rs8LAPhK+EsC9AD0AMntVIAgEgCwkB3P9/jQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+Gkh7UTQINdJwgGOF9P/0z/TAPQE9AX4a/hqf/hh+Gb4Y/hijh70BW34am34a3ABgED0DvK91wv/+GJw+GNw+GZ/+GHi0wABCgC+jhKBAgDXGCD5AVj4QiD4ZfkQ8qje0z8Bjh74QyG5IJ8wIPgjgQPoqIIIG3dAoLnekvhj4IA08jTY0x8B+CO88rnTHyHBAyKCEP////28sZNb8jzgAfAB+EdukzDyPN4CASATDAIBWA8NAce5XvCGHwgt0l4A299IGj8IpA3SRg4b3whXXlwM3wAODg2t4E4NreBEfwlQICF+gVHCumP+gIst4EA6Y/6Aiy3gQDrhb+3gc24NreBODa3gTg3gfEQN4kaEDeIGZA3iJkYEmB/wDgCAjjMm0NMB+kAwMcjPhyDOgGDPQM+Bz4HPk+veEMIjzwt/Im8iAssf9AAhbyICyx/0AMlx+wDeXwMwkvAF3n/4ZwIBIBEQALe2LVfP/hBbo5C7UTQINdJwgGOF9P/0z/TAPQE9AX4a/hqf/hh+Gb4Y/hijh70BW34am34a3ABgED0DvK91wv/+GJw+GNw+GZ/+GHi3vhG8nNx+GbR+ADwBX/4Z4AHHt3gFyH4QW6S8Abe+kDR+EUgbpIwcN74Qrry4Gb4AHBwbW8CcG1vAiP4S4EBC/QKjhXTH/QEWW8CAdMf9ARZbwIB1wt/bwObcG1vAnBtbwJwbwPiIG8SNCBvEDMgbxEyMCTA/4BIAgI4zJtDTAfpAMDHIz4cgzoBgz0DPgc+Bz5OXgFyGI88LfyJvIgLLH/QAIW8iAssf9ADJcfsA3l8DMJLwBd5/+GcCASAZFAIBIBgVAQm4K98msBYB/PhBbpLwBt76QNcNf5XU0dDTf9/XDACV1NHQ0gDf0fhFIG6SMHDe+EK68uBm+AD4J28QIrzyvCEjIsjPhYDKAHPPQM4B+gKAac9Az4HPgclz+wAi+EuBAQv0Co4V0x/0BFlvAgHTH/QEWW8CAdcLf28Dm3BtbwJwbW8CcG8D4hcA4PgjIW8SIiBvECPIyx8BbyIhpANZgCD0Q28Cb1AzIiBvESbIy38BbyIhpANZgCD0Q28Cb1EzIiEmoLV/b1Iz+EsmASRvI8gjbyJZzwsf9AAibyJZzwsf9AAhzwt/A18DWYEBC/RB+GtfA18D8AV/+GcAp7jE7Q4/CC3SXgDb2j8IpA3SRg4b3whXXlwM3wAOHwTt4gYkOB/xxGR6GmA/SAYGORnw5BnQDBnoGfA58DnyUxO0OMQ54W/5Lj9gG8YSXgC7z/8M8AFC3XAi0NMD+kAw+GmpOADcIccAIJwwIdMfIcAAIJJsId7fGgE+joDgIcEDIoIQ/////byxk1vyPOAB8AH4R26TMPI83hsB/nHwAfAG+CP4SfhKgQEL9AqOFdMf9ARZbwIB0x/0BFlvAgHXC39vA5twbW8CcG1vAnBvA+IgbxIhIG8QJMjLHwFvIiGkA1mAIPRDbwJvUDIhIG8RcGim+2CVaKb+YDHfyMt/AW8iIaQDWYAg9ENvAm9RMiEhcGim+2CVaKb+YDEcAGrfoLV/b1Iy+Er4SQEjbyPII28iWc8LH/QAIm8iWc8LH/QAIc8LfwNfA1mBAQv0QfhqXwPwBQ==',
};


module.exports = {
    GiverContractNTD: {
        abi: abi,
        tvc: pkg.imageBase64,
    }
};
