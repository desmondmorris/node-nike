/**
 * A NodeJS module for interacting with Nike+ API.
 * @module node-twitter
 * @version 0.0.2
 * @author Desmond Morris
 * @description A NodeJS module for interacting with Nike+ API.
 * @param {Object} config A valid configuration.
 */
var https = require('https');

/**
 * Constructor
 * @param {String} access_token Nike+ access token
 */
function Nike(access_token) {
  if (!(this instanceof Nike)) return new Nike(access_token);
  this.access_token = access_token;
  this.api_endpoint = 'api.nike.com';
  this.api_endpoint_base_path = '/me/sport'
}

/**
 * Makes a get request to the Nike+ api endpoint
 * @param  {String}   url      The path to the api method
 * @param  {Object}   params
 * @param  {Function} callback
 */
Nike.prototype.get = function(url, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "Invalid callback function";
    return this;
  }

  url = this.api_endpoint_base_path + url;

  var request_options = {
    host: this.api_endpoint,
    port: 443,
    path: url + '?access_token=' + this.access_token,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'appid': 'nike'
    }
  };

  https.get(request_options, function(res){
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('error', function(e) {
      callback(e);
    });

    res.on('end',function(){
      var obj = undefined;
      obj = JSON.parse(data || "null");
      callback(null, obj);
    });
  });

}

/**
 * Provides a list of the Nike+ experiences in which the user participates
 * @see    http://developer.nike.com/activities/get_aggregate_sport_data
 * @param  {Object}   params
 * @param  {Function} callback
 */
Nike.prototype.aggregate = function(params, callback) {
  this.get('/', params, callback);
}

/**
 * Provides details of the user’s activities
 * @see    http://developer.nike.com/activities/list_users_activities
 * @param  {Object}   params
 * @param  {Function} callback
 */
Nike.prototype.activites = function(params, callback) {
  this.get('/activities', params, callback);
}

/**
 * Provides details of one of the user’s activities, specified by
 * its Activity ID
 * @see    http://developer.nike.com/activities/get_activity_detail_for_activity_id
 * @param  {String}   params    "{activityId: 'XXXXX'}"
 * @param  {Function} callback
 */
Nike.prototype.activity = function(params, callback) {
  var path = '/activities/' + params.activityId;
  this.get(path, params, callback);
}

/**
 * Provides GPS data for one of the user’s activities, specified by
 * its Activity ID.  This only works with RUNNING activities
 * @see    https://developer.nike.com/activities/get_gps_data_for_activity_id
 * @param  {String}   params    "{activityId: 'XXXXX'}"
 * @param  {Function} callback
 */
Nike.prototype.activity_gps = function(params, callback) {
  var path = '/activities/' + params.activityId + '/gps';
  this.get(path, params, callback);
}

/**
 * Retrieves the details of a user's activity by experience type.
 * @see    https://developer.nike.com/activities/get_gps_data_for_activity_id
 * @param  {String}   params    "{experienceType: 'XXXXX'}"
 * @param  {Function} callback
 */
Nike.prototype.by_experience_type = function(params, callback) {
  var path = '/activities/' + params.experienceType;
  this.get(path, params, callback);
}

module.exports = Nike;
