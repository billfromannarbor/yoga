//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

const assert = require("assert")
const fs = require("fs")
var By = require('selenium-webdriver').By
var until = require('selenium-webdriver').until
var firefox = require('selenium-webdriver/firefox')
var chrome = require('selenium-webdriver/chrome')
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

test.describe("regex-sandbox", regexSandboxTest)

function regexSandboxTest() {
  var driver;

  test.before(function() {
  	this.timeout(testConfig.timeout)
    driver = new firefox.Driver()
    //driver = new chrome.Driver()
    driver.get(homepage)
		driver.getTitle().then(function(title) {
			assert.equal("YOGA",title)
			})
  })
  
	test.it("clicks on the navbar and opens RegEx Sandbox", function() {
  	this.timeout(testConfig.timeout)
		driver.findElement(By.id("navbar-regexsandbox")).then(function(element) {
				element.click().then(function() {
					driver.getTitle().then(function(title) {
						assert.equal("RegEx Sandbox - YOGA",title)
						})
					})
			}, 
			function(e) {
  			assert(false,"navbar-regexsandbox not found")
			})
	})

  test.after(function() {
    this.timeout(testConfig.timeout)
    driver.quit()
  })
}