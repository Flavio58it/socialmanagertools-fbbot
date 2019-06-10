/**
 * API: Goto
 * =====================
 * Go to profile page, go to post, go to url... etc...
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: This code and contributions have 'MIT License'
 *
 */
const Log = require("./../logger/log");
const Translate = require("./../commons/translate");
const Utils = require("./../commons/utils");
const core = require("./../core/core");

class Goto {
	constructor(LOG_NAME = "api") {
		this.core = core;
		this.LOG_NAME = LOG_NAME;

		this.log = new Log(this.LOG_NAME);
		this.lang = new Translate();
		this.utils = new Utils();
	}

	/**
     * Post
     * =====================
     * Goto post page
     *
     * @param {string}  id_hash - string of id hash of post (mandatory)
     *
     * @return {boolean} status         - true: successful / false: fail
     *         {string}  response.error - if status is false return error details
     *
     * @since: v0.10
     *
     */
	async post(id_hash) {
		let tag = "goto::post()";
		this.log.info(tag, `${this.lang.translate("try_goto_post_page")}`);

		let response = {"status": false};

		try {
			await this.core.bot.goto(`https://www.facebook.com/p/${id_hash}/`);

			response.status = true;
		} catch (err) {
			response.status = false;
			response.error = err;
		}

		if (response.status) {
			this.log.info(tag, `${this.lang.translate("post_id")}: ${id_hash}`);
			this.log.info(tag, `${this.lang.translate("done")}`);
		} else {
			this.log.error(tag, `${response.error}`);
			this.log.docs("api", tag);
			this.log.stackoverflow(tag, "puppeteer", response.error);
		}

		return response;
	}

	/**
     * Hashtag
     * =====================
     * Goto hashtag page
     *
     * @param {string}  hashtag - string of hashtag, work with # or without # prefix (mandatory)
     *
     * @return {boolean} status         - true: successful / false: fail
     *         {string}  response.error - if status is false return error details
     *
     * @since: v0.10
     *
     */
	async hashtag(hashtag) {
		let tag = "goto::hashtag()";
		this.log.info(tag, `${this.lang.translate("try_goto_hashtag_page")}`);

		let response = {"status": false};

		try {
			hashtag = hashtag.replace(/#/g, "");

			await this.core.bot.goto(`https://www.facebook.com/explore/tags/${hashtag}/`);

			response.status = true;
		} catch (err) {
			response.status = false;
			response.error = err;
		}

		if (response.status) {
			this.log.info(tag, `#${hashtag}`);
			this.log.info(tag, `${this.lang.translate("done")}`);
		} else {
			this.log.error(tag, `${response.error}`);
			this.log.docs("api", tag);
			this.log.stackoverflow(tag, "puppeteer", response.error);
		}

		return response;
	}

	/**
     * Location
     * =====================
     * Goto gps location page
     *
     * @param {int}  gps - location facebook id (mandatory)
     *
     * @return {boolean} status         - true: successful / false: fail
     *         {string}  response.error - if status is false return error details
     *
     * @since: v0.10
     *
     */
	async location(gps) {
		let tag = "goto::location()";
		this.log.info(tag, `${this.lang.translate("try_goto_gps_page")}`);

		let response = {"status": false};

		try {
			await this.core.bot.goto(`https://www.facebook.com/explore/locations/${gps}/`);

			response.status = true;
		} catch (err) {
			response.status = false;
			response.error = err;
		}

		if (response.status) {
			this.log.info(tag, `GPS ID: ${gps}`);
			this.log.info(tag, `${this.lang.translate("done")}`);
		} else {
			this.log.error(tag, `${response.error}`);
			this.log.docs("api", tag);
			this.log.stackoverflow(tag, "puppeteer", response.error);
		}

		return response;
	}

	/**
     * Profile
     * =====================
     * Goto profile of user
     *
     * @param {string}  profile - string of nickname, work with @ or without @ prefix (mandatory)
     *
     * @return {boolean} status         - true: successful / false: fail
     *         {string}  response.error - if status is false return error details
     *
     * @since: v0.10
     *
     */
	async profile(nickname) {
		let tag = "goto::profile()";
		this.log.info(tag, `${this.lang.translate("try_goto_profile_page")}`);

		let response = {"status": false};

		nickname = nickname.replace(/@/g, "");

		try {
			await this.core.bot.goto(`https://www.facebook.com/${nickname}/`);

			response.status = true;
		} catch (err) {
			response.status = false;
			response.error = err;
		}

		if (response.status) {
			this.log.info(tag, `@${nickname}`);
			this.log.info(tag, `${this.lang.translate("done")}`);
		} else {
			this.log.error(tag, `${response.error}`);
			this.log.docs("api", tag);
			this.log.stackoverflow(tag, "puppeteer", response.error);
		}

		return response;
	}

	/**
     * Login
     * =====================
     * Goto login page
     *
     * @return {boolean} status         - true: successful / false: fail
     *         {string}  response.error - if status is false return error details
     *
     * @since: v0.10
     *
     */
	async login() {
		let tag = "goto::login()";
		this.log.info(tag, `${this.lang.translate("try_goto_login_page")}`);

		let response = {"status": false};

		try {
			await this.core.bot.goto("https://www.facebook.com/accounts/login/");

			response.status = true;
		} catch (err) {
			response.status = false;
			response.error = err;
		}

		if (response.status) {
			this.log.info(tag, `${this.lang.translate("done")}`);
		} else {
			this.log.error(tag, `${response.error}`);
			this.log.docs("api", tag);
			this.log.stackoverflow(tag, "puppeteer", response.error);
		}

		return response;
	}
}

module.exports = Goto;