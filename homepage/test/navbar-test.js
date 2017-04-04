//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

const assert = require("assert")
const fs = require("fs")
var By = require('selenium-webdriver').By
var until = require('selenium-webdriver').until
var firefox = require('selenium-webdriver/firefox')
var test = require('selenium-webdriver/testing')
var homepage

const testConfigFile = fs.readFileSync("test/testconfig.json","utf-8")
const testConfig = JSON.parse(testConfigFile)

if ( testConfig.useLocal == true ) {
	homepage=testConfig.localHomePage
	}
else {
	homepage=testConfig.homePage
}

test.describe("click through the navbar",clickThroughTheNavBarTest)

function clickThroughTheNavBarTest() {
  var driver;

  test.before(function() {
  	this.timeout(testConfig.timeout)
    driver = new firefox.Driver()
    driver.get(homepage)
    driver.wait(until.titleIs("YOGA", testConfig.timeout))
  })

	test.it("Open RegEx Sandbox", function() {
  	this.timeout(testConfig.timeout)
		driver.findElement(By.id("navbar-regexsandbox")).then(function(element) {
				element.click().then(function() {
					driver.getTitle().then(function(title) {
						console.log(title)
						assert.equal("RegEx Sandbox - YOGA",title)
						})
					})
			}, 
			function(e) {
  			assert(false,"navbar-regexsandbox not found")
			})
	})

	test.it("Open MapIt", function() {
  	this.timeout(testConfig.timeout)
		driver.findElement(By.id("navbar-mapit")).then(function(element) {
				element.click().then(function() {
					driver.getTitle().then(function(title) {
						console.log(title)
						assert.equal("MapIt - YOGA",title)
						})
					})
			}, 
			function(e) {
  			assert(false,"navbar-mapit not found")
			})
	})

	test.it("Open Filefun", function() {
  	this.timeout(testConfig.timeout)
		driver.findElement(By.id("navbar-filefun")).then(function(element) {
				element.click().then(function() {
					driver.getTitle().then(function(title) {
						console.log(title)
						assert.equal("File Fun - YOGA",title)
						})
					})
			}, 
			function(e) {
  			assert(false,"navbar-filefun not found")
			})
	})

	test.it("Open Marlboro", function() {
  	this.timeout(testConfig.timeout)
		driver.findElement(By.id("navbar-marlboro")).then(function(element) {
				element.click().then(function() {
					driver.getTitle().then(function(title) {
						console.log(title)
						assert.equal("Marlboro",title)
						})
					})
			}, 
			function(e) {
  			assert(false,"navbar-marlboro not found")
			})
	})

	test.it("Open Todo", function() {
  	this.timeout(testConfig.timeout)
		driver.findElement(By.id("navbar-todo")).then(function(element) {
				element.click().then(function() {
					driver.getTitle().then(function(title) {
						console.log(title)
						assert.equal("TODO - YOGA",title)
						})
					})
			}, 
			function(e) {
  			assert(false,"navbar-marlboro not found")
			})
	})
	
  test.after(function() {
    this.timeout(testConfig.timeout)
    driver.quit()
  })
}
