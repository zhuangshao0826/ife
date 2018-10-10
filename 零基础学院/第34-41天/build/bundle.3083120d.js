/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3083120dc4a43d8fe041";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/css/style.css?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _checkbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkbox.js */ \"./src/js/checkbox.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_style_css__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nObject(_checkbox_js__WEBPACK_IMPORTED_MODULE_0__[\"creatCheckbox\"])(REGION, _checkbox_js__WEBPACK_IMPORTED_MODULE_0__[\"regionList\"])\r\nObject(_checkbox_js__WEBPACK_IMPORTED_MODULE_0__[\"creatCheckbox\"])(PRODUCT, _checkbox_js__WEBPACK_IMPORTED_MODULE_0__[\"productList\"])\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/bar.js":
/*!***********************!*\
  !*** ./src/js/bar.js ***!
  \***********************/
/*! exports provided: drawBarGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawBarGraph\", function() { return drawBarGraph; });\n/**\r\n * 绘制svg柱状表格\r\n * @param {data} 数据 \r\n */\r\nfunction drawBarGraph(data) {\r\n    let barGraph = $('bar-graph')\r\n\r\n    // 定义绘制区域的高度和宽度\r\n    const drawAreaWidth = 500\r\n    const drawAreaHeight = 400\r\n    const drawAreaPadding = 25\r\n    barGraph.setAttribute('width', drawAreaWidth)\r\n    barGraph.setAttribute('height', drawAreaHeight)\r\n\r\n    // 定义轴的高度和宽度\r\n    const axisHeight = drawAreaHeight - 2*drawAreaPadding\r\n    const axisWidth = drawAreaWidth - 2*drawAreaPadding\r\n\r\n    // 定义柱子的宽度,柱子间距\r\n    const barGap = 10\r\n    let barWidth = ((axisWidth - 13 * barGap) / data.length) / 12\r\n\r\n    // 定义柱子的颜色\r\n    const barColor = ['#27a1ea', '#9cdc82', '#ff9f69', '#d660a8', '#6370de', '#32d3eb', '#d4ec59', '#feb64d', '#b55cbd']\r\n    // 定义好轴的颜色\r\n    const axisColor = '#000'\r\n\r\n    // 拿到柱状图中的最大值Max\r\n    let max = 0\r\n    let newdata = []\r\n    for (let i = 0; i < data.length; i++) {\r\n        let temp = Math.max(...(data[i].sale))\r\n        if (temp > max) {\r\n            max = temp\r\n        }\r\n        newdata.push(data[i].sale)\r\n    }\r\n\r\n    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例\r\n    const rate = (axisHeight - drawAreaPadding) / max\r\n\r\n    let barHtml = ``\r\n    // 横轴\r\n    barHtml += `<line x1=\"${drawAreaPadding}\" y1=\"${drawAreaPadding+axisHeight}\" x2=\"${drawAreaPadding+axisWidth}\" y2=\"${drawAreaPadding+axisHeight}\"  style=\"stroke:${axisColor};stroke-width:2\"/>`\r\n    // 纵轴\r\n    barHtml += `<line x1=\"${drawAreaPadding}\" y1=\"${drawAreaPadding}\" x2=\"${drawAreaPadding}\" y2=\"${drawAreaPadding+axisHeight}\" style=\"stroke:${axisColor};stroke-width:2\"/>`\r\n    //给坐标轴加上注释\r\n    // for(let i=1; i<=12; i++){\r\n    //     barHtml += `<text x=\"${drawAreaPadding+barGap*i+barWidth*(i-1)+0.5*barWidth}\" y=\"${drawAreaPadding*1.6+axisHeight}\" fill=\"${axisColor}\" style=\"text-anchor: middle;font-size:12px\">${i}月</text>`\r\n    // }\r\n\r\n\r\n    //     遍历数据\r\n    for (let i = 0; i < newdata.length; i++) {\r\n        for (let j = 0; j < newdata[i].length; j++) {\r\n            let k = newdata.length\r\n            let barHeight = rate * parseInt(newdata[i][j])\r\n            barHtml += `<rect x=\"${drawAreaPadding+barGap*(j+1)+barWidth*(j*k+i)}\" y=\"${drawAreaPadding+axisHeight-barHeight}\" width=\"${barWidth}\" height=\"${barHeight}\" style=\"fill:${barColor[i]};stroke-width:1\"/>`\r\n        }\r\n    }\r\n    // 绘制柱子 横轴 纵轴\r\n    barGraph.innerHTML = barHtml\r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/bar.js?");

/***/ }),

/***/ "./src/js/checkbox.js":
/*!****************************!*\
  !*** ./src/js/checkbox.js ***!
  \****************************/
/*! exports provided: creatCheckbox, regionList, productList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"creatCheckbox\", function() { return creatCheckbox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"regionList\", function() { return regionList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"productList\", function() { return productList; });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/js/data.js\");\n/* harmony import */ var _getData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getData.js */ \"./src/js/getData.js\");\n/* harmony import */ var _table_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table.js */ \"./src/js/table.js\");\n/* harmony import */ var _mergetable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mergetable.js */ \"./src/js/mergetable.js\");\n/* harmony import */ var _bar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bar.js */ \"./src/js/bar.js\");\n/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./line.js */ \"./src/js/line.js\");\n// 生成表单\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/** \r\n * @param {*} data 数据\r\n * 返回所需要的地区选项数据数组 \r\n */\r\nfunction getRegion(data) {\r\n    return [...new Set(data.map(x => x.region))]\r\n}\r\n\r\n/** \r\n * @param {*} data 数据\r\n * 返回所需要的商品选项数据数组 \r\n */\r\nfunction getProduct(data) {\r\n    return [...new Set(data.map(x => x.product))]\r\n}\r\n\r\nlet regionList = getRegion(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"sourceData\"])\r\nlet productList = getProduct(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"sourceData\"])\r\n\r\n/**\r\n * 生成表单\r\n * @param {*} Node 生成表单的父元素\r\n * @param {*} checkboxList 生成表单复选框的数据数组\r\n */\r\nfunction creatCheckbox(Node, checkboxList) {\r\n    // 全选框创建\r\n    let listHtml = `<label for=\"${Node.id}\"><input id=\"${Node.id}\" type=\"checkbox\" >全选</label>`\r\n    // 遍历数据创建复选框\r\n    checkboxList.forEach((element, index) => {\r\n        listHtml += `<label for=\"${element}\"><input id=\"${element}\" type=\"checkbox\" value=\"${element}\" ${index === 0 ? 'checked' : \"\"}>${element}</label>`\r\n    })\r\n\r\n    Node.innerHTML += listHtml\r\n\r\n    // 给复选框和全选加上逻辑判断 \r\n    Node.addEventListener('change', (e) => {\r\n        e = e || e.window\r\n        let target = e.target || e.srcElement\r\n        if (target.tagName === 'INPUT') {\r\n            let ipts = Node.querySelectorAll(\"input[type='checkbox']\")\r\n            let iptschecked = Node.querySelectorAll(\"input[type='checkbox']:checked\")\r\n            // 如果点击是全选框 \r\n            if (target.id === Node.id) {\r\n                if (!target.checked) {\r\n                    target.checked = true\r\n                } else {\r\n                    ipts.forEach(x => {\r\n                        x.checked = true\r\n                    })\r\n                }\r\n            } else {\r\n                if (iptschecked.length == ipts.length - 1 && !ipts[0].checked) {\r\n                    ipts[0].checked = true\r\n                } else if(iptschecked.length===0){\r\n                    target.checked =true\r\n                }else {\r\n                    ipts[0].checked = null\r\n                }\r\n            }\r\n            // 加入表格 \r\n            let data=Object(_getData_js__WEBPACK_IMPORTED_MODULE_1__[\"getData\"])(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"sourceData\"])\r\n            Object(_table_js__WEBPACK_IMPORTED_MODULE_2__[\"insertTable\"])(data)\r\n            //合并处理表格\r\n            Object(_mergetable_js__WEBPACK_IMPORTED_MODULE_3__[\"changeCell\"])()\r\n            Object(_mergetable_js__WEBPACK_IMPORTED_MODULE_3__[\"mergeCell\"])(1, 0)\r\n            //图表\r\n            Object(_bar_js__WEBPACK_IMPORTED_MODULE_4__[\"drawBarGraph\"])(data)\r\n            let line = new _line_js__WEBPACK_IMPORTED_MODULE_5__[\"Line\"]($('line-chart'))\r\n            line.creatPath(data)\r\n        }\r\n    })\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/checkbox.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/*! exports provided: sourceData, initData, storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sourceData\", function() { return sourceData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initData\", function() { return initData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"storage\", function() { return storage; });\nlet sourceData = [{\r\n    product: \"手机\",\r\n    region: \"华东\",\r\n    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]\r\n}, {\r\n    product: \"手机\",\r\n    region: \"华北\",\r\n    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]\r\n}, {\r\n    product: \"手机\",\r\n    region: \"华南\",\r\n    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]\r\n}, {\r\n    product: \"笔记本\",\r\n    region: \"华东\",\r\n    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]\r\n}, {\r\n    product: \"笔记本\",\r\n    region: \"华北\",\r\n    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]\r\n}, {\r\n    product: \"笔记本\",\r\n    region: \"华南\",\r\n    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]\r\n}, {\r\n    product: \"智能音箱\",\r\n    region: \"华东\",\r\n    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]\r\n}, {\r\n    product: \"智能音箱\",\r\n    region: \"华北\",\r\n    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]\r\n}, {\r\n    product: \"智能音箱\",\r\n    region: \"华南\",\r\n    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]\r\n}];\r\n\r\n/**\r\n * 返回处理后的sourcedata （localstorage中有的数据拿出并修改）\r\n * @param {*} sourceData  原始数据\r\n */\r\nfunction initData(sourceData) {\r\n    const localData = JSON.parse(localStorage.getItem(\"newdata\"))\r\n    if(localData){\r\n        sourceData.forEach(element => {\r\n            localData.forEach(ele => {\r\n                if(element.region===ele.region && element.product===ele.product){\r\n                    element.sale=ele.sale\r\n                }\r\n            })\r\n        });\r\n    }\r\n    console.log(sourceData)\r\n    return sourceData\r\n}\r\n/**\r\n * 存储数据在localstorage\r\n * @param {*} data  修改的数据｛productxxxx regionxxx salexxx｝ \r\n */\r\nfunction storage(data) {\r\n    if(window.localStorage){\r\n        // newdata 缓存是否存在\r\n        if(localStorage.getItem(\"newdata\")){\r\n            // 读取缓存 转化为json格式\r\n            let localData=JSON.parse(localStorage.getItem(\"newdata\"))\r\n            \r\n            for(let i=0;i<localData.length;i++){\r\n                if(localData[i].region==data.region && localData[i].product==data.product){\r\n                    localData[i].sale=data.sale\r\n                    let newLocalData=JSON.stringify(localData)\r\n                    localStorage.setItem(\"newdata\",newLocalData)\r\n                    break\r\n                }\r\n            }\r\n            localData.push(data)\r\n            let addLocalData=JSON.stringify(localData)\r\n            localStorage.setItem(\"newdata\", addLocalData)\r\n        }else{\r\n            let newdata=[]\r\n            newdata[0]=data\r\n            let addNewLocalData=JSON.stringify(newdata)\r\n            localStorage.setItem(\"newdata\", addNewLocalData)\r\n        }\r\n    }\r\n}\r\n\r\n \n\n//# sourceURL=webpack:///./src/js/data.js?");

/***/ }),

/***/ "./src/js/edit.js":
/*!************************!*\
  !*** ./src/js/edit.js ***!
  \************************/
/*! exports provided: edit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"edit\", function() { return edit; });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/js/data.js\");\n/* harmony import */ var _bar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar.js */ \"./src/js/bar.js\");\n/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./line.js */ \"./src/js/line.js\");\n/* harmony import */ var _getData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getData.js */ \"./src/js/getData.js\");\n/* harmony import */ var _table_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table.js */ \"./src/js/table.js\");\n/* harmony import */ var _mergetable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mergetable.js */ \"./src/js/mergetable.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction edit() { \r\n    table.addEventListener('click',function(e){\r\n        e=e||window.event\r\n        let target=e.target||e.srcElement\r\n        if(target.tagName===\"I\"){\r\n            let td = target.parentNode\r\n            let value=parseInt(td.textContent)\r\n            let ipt = document.createElement(\"input\")\r\n            ipt.setAttribute(\"id\",1);\r\n            ipt.value=value\r\n            let btn1 = document.createElement(\"button\")\r\n            let btn2 = document.createElement(\"button\")\r\n            btn1.textContent = \"确定\";\r\n            btn1.setAttribute(\"id\", \"confirm\");\r\n            btn2.textContent = \"取消\";\r\n            btn2.setAttribute(\"id\", \"cancel\");\r\n            td.innerHTML=\"\"\r\n            td.appendChild(ipt)\r\n            td.appendChild(btn1)\r\n            td.appendChild(btn2)\r\n            ipt.select()\r\n\r\n            function confirm(){\r\n                let val=ipt.value\r\n\r\n                if(isNaN(parseInt(val))){\r\n                    ipt.focus()\r\n                    alert(\"请输入数字！\")\r\n                }else if(val===value){\r\n                    ipt.focus()\r\n                    alert(\"没有修改数字！\")\r\n                }else{\r\n                    let arr=Array.from(td.parentElement.children)\r\n                    console.log(arr)\r\n                    arr=arr.map((x)=>{\r\n                        return x.innerText.replace(/✎/g,\"\")\r\n                    })\r\n                    for(let i=0; i<arr.length;i++){\r\n                        if(arr[i].id){\r\n                            arr[i]=val\r\n                        }\r\n                    }\r\n                    console.log(arr)\r\n                    let xdata={\r\n                    product: \"arr[0].innerText\",\r\n                    region: \"arr[0].innerText\",\r\n                    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]}\r\n                    Object(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"storage\"])(xdata)\r\n                    let data=Object(_getData_js__WEBPACK_IMPORTED_MODULE_3__[\"getData\"])(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"sourceData\"])\r\n                    Object(_table_js__WEBPACK_IMPORTED_MODULE_4__[\"insertTable\"])(data)\r\n                    //合并处理表格\r\n                    Object(_mergetable_js__WEBPACK_IMPORTED_MODULE_5__[\"changeCell\"])()\r\n                    Object(_mergetable_js__WEBPACK_IMPORTED_MODULE_5__[\"mergeCell\"])(1, 0)\r\n                    //图表\r\n                    Object(_bar_js__WEBPACK_IMPORTED_MODULE_1__[\"drawBarGraph\"])(data)\r\n                    let line = new _line_js__WEBPACK_IMPORTED_MODULE_2__[\"Line\"]($('line-chart'))\r\n                    line.creatPath(data)\r\n            }}\r\n            function cancel(e){\r\n                e=e||window.event\r\n                let target=e.target||e.srcElement\r\n                target.parentNode.innerHTML=value+`<i>✎</i>`\r\n            }\r\n            ipt.addEventListener(\"blur\",cancel)\r\n            btn1.addEventListener(\"mousedown\",confirm)\r\n            btn2.addEventListener(\"click\",cancel)\r\n            document.addEventListener('keydown', (e) => {\r\n                        // Enter键\r\n                        if (e.keyCode === 13) {\r\n                            confirm()\r\n                            // ESC按键\r\n                        } else if (e.keyCode === 27) {\r\n                            cancel()\r\n                        }\r\n                    })\r\n    }})}\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/edit.js?");

/***/ }),

/***/ "./src/js/getData.js":
/*!***************************!*\
  !*** ./src/js/getData.js ***!
  \***************************/
/*! exports provided: getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getData\", function() { return getData; });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/js/data.js\");\n\r\n/**\r\n * 返回用户checkbox所选择选项的数据\r\n * @param {*} sourceData 与数据对比来筛选需要的数据 \r\n */\r\nfunction getData(sourceData) {\r\n    sourceData=Object(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"initData\"])(sourceData)\r\n    let data=[]\r\n    let ipts = document.querySelectorAll(\"input[type=checkbox]:checked\");\r\n    let arr=[]\r\n    for(let i=0; i<ipts.length; i++){\r\n        if(ipts[i].value){\r\n            arr.push(ipts[i].value)\r\n        }\r\n    }\r\n\r\n    for (let key of sourceData) {\r\n        if(arr.indexOf(key.product)!==-1&&arr.indexOf(key.region)!==-1){\r\n            data.push(key)\r\n        }\r\n    }\r\n    return data\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/getData.js?");

/***/ }),

/***/ "./src/js/line.js":
/*!************************!*\
  !*** ./src/js/line.js ***!
  \************************/
/*! exports provided: Line */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Line\", function() { return Line; });\n/**\r\n * \r\n * @param {*} node 绘制元素canvas节点\r\n */\r\nfunction Line(node) {\r\n    this.ctx = node.getContext('2d')\r\n    this.width = node.width\r\n    this.height = node.height\r\n    this.offset = 25\r\n    this.contentWidth = this.width - 2 * this.offset\r\n    this.contentHeight = this.height - 2 * this.offset\r\n    this.colors = ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8', '#fc97af', '#f7f494', '#87f7cf', '#f7c5a0'],\r\n        this.color = '#000',\r\n        this.dataRadius = 4,\r\n        this.dataDistance = this.contentWidth / 13\r\n}\r\n\r\nLine.prototype = {\r\n    // 创建坐标轴\r\n    creatAxis: function (max) {\r\n        this.ctx.lineWidth = 1\r\n        this.ctx.strokeStyle = this.color\r\n        this.ctx.beginPath()\r\n        this.ctx.moveTo(this.offset, this.offset)\r\n        this.ctx.lineTo(this.offset, this.offset + this.contentHeight)\r\n        this.ctx.stroke()\r\n        this.ctx.moveTo(this.offset, this.offset + this.contentHeight)\r\n        this.ctx.lineTo(this.offset + this.contentWidth, this.offset + this.contentHeight)\r\n        this.ctx.stroke()\r\n\r\n        // 给x y轴加上注释\r\n        for (let i = 1; i <= 12; i++) {\r\n            this.creatText(this.offset + this.dataDistance * i, this.contentHeight + this.offset, i + '月', 'center')\r\n        }\r\n        this.creatText(this.offset - 5, this.offset, max, 'end')\r\n        this.creatText(this.offset, this.contentHeight + this.offset, 0, 'end')\r\n    },\r\n\r\n    // 获取最大值和销售值\r\n    getNewdata: function (data) {\r\n        let newdata = []\r\n        let max = 0\r\n        data.forEach(element => {\r\n            let temp = Math.max(...element.sale)\r\n            if (temp > max) {\r\n                max = temp\r\n            }\r\n            newdata.push(element.sale)\r\n        })\r\n        return {\r\n            newdata,\r\n            max\r\n        }\r\n    },\r\n\r\n    // 画折线数据\r\n    creatPath: function (data) {\r\n        let {\r\n            newdata,\r\n            max\r\n        } = this.getNewdata(data)\r\n        this.init()\r\n        this.creatAxis(max)\r\n        // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例\r\n        const rate = (this.contentHeight - this.offset) / max\r\n        // 绘制折线\r\n        for (let i = 0; i < newdata.length; i++) {\r\n            for (let j = 0; j < newdata[i].length; j++) {\r\n                let x1 = (j + 1) * this.dataDistance + this.offset\r\n                let x2 = (j + 2) * this.dataDistance + this.offset\r\n                let y1 = this.contentHeight - newdata[i][j] * rate + this.offset\r\n                let y2 = this.contentHeight - newdata[i][j + 1] * rate + this.offset\r\n\r\n                this.ctx.beginPath()\r\n                this.ctx.moveTo(x1, y1)\r\n                this.ctx.lineTo(x2, y2)\r\n                this.ctx.closePath()\r\n                this.ctx.strokeStyle = this.colors[i]\r\n                this.ctx.lineWidth = '2'\r\n                this.ctx.stroke()\r\n\r\n                this.ctx.beginPath()\r\n                this.ctx.arc(x1, y1, this.dataRadius, 0, 2 * Math.PI)\r\n                this.ctx.closePath()\r\n                this.ctx.fillStyle = this.colors[i]\r\n                this.ctx.fill()\r\n            }\r\n        }\r\n    },\r\n\r\n    // 加文本注释数值\r\n    creatText: function (x, y, text, position) {\r\n        this.ctx.textAlign = position\r\n        this.ctx.fillStyle = this.color\r\n        this.ctx.fillText(text, x, y + 11)\r\n    },\r\n\r\n    // 清空\r\n    init: function () {\r\n        this.ctx.clearRect(0, 0, this.offset + this.contentWidth, this.offset + this.contentHeight)\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/line.js?");

/***/ }),

/***/ "./src/js/mergetable.js":
/*!******************************!*\
  !*** ./src/js/mergetable.js ***!
  \******************************/
/*! exports provided: changeCell, mergeCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeCell\", function() { return changeCell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeCell\", function() { return mergeCell; });\n\r\n/**\r\n * 交换表格的一二列在地区只有一个情况下\r\n */\r\nfunction changeCell() {\r\n    let tab = document.querySelector(\"#table\");\r\n    let ipts1 = REGION.querySelectorAll(\"input[type=checkbox]:checked\");\r\n    let ipts2 = PRODUCT.querySelectorAll(\"input[type=checkbox]:checked\");\r\n    // 当地区选择了一个，商品选择了多个的时候，第一列第二列交换\r\n    if (ipts1.length === 1 && ipts2.length !== 1) {\r\n        for (let i = 0; i < tab.rows.length; i++) {\r\n            let temp = tab.rows[i].cells[0].innerHTML;\r\n            tab.rows[i].cells[0].innerHTML = tab.rows[i].cells[1].innerHTML;\r\n            tab.rows[i].cells[1].innerHTML = temp;\r\n        }\r\n    }\r\n}\r\n\r\n/**\r\n *  合并从startrow行 col列开始 向下开始的单元格\r\n * @param {*} startrow 开始行数\r\n * @param {*} col 合并单元格列数\r\n */\r\nfunction mergeCell(startrow,col) {\r\n    let tab = document.querySelector(\"#table\");\r\n    for (let i = startrow; i < tab.rows.length - 1; i++) {\r\n        // 如果第i行和第i+1行内容相同则隐藏第i+1行，同时第i行的rowSpan+1\r\n        if (tab.rows[startrow].cells[col].innerHTML === tab.rows[i + 1].cells[col].innerHTML) {\r\n            tab.rows[i + 1].cells[col].style.display = \"none\";\r\n            tab.rows[startrow].cells[col].rowSpan += 1;\r\n        }\r\n        // 不相等的时候从第i+1行再次执行次函数\r\n        else {\r\n            mergeCell(i + 1, 0)\r\n        }\r\n    }\r\n}\r\n\r\n \n\n//# sourceURL=webpack:///./src/js/mergetable.js?");

/***/ }),

/***/ "./src/js/table.js":
/*!*************************!*\
  !*** ./src/js/table.js ***!
  \*************************/
/*! exports provided: insertTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertTable\", function() { return insertTable; });\n/* harmony import */ var _bar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar.js */ \"./src/js/bar.js\");\n/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line.js */ \"./src/js/line.js\");\n/* harmony import */ var _edit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit.js */ \"./src/js/edit.js\");\n\r\n\r\n\r\n\r\n/**\r\n * 根据表单数据生成表格\r\n * @param {*} data 表单数据\r\n */\r\nfunction insertTable(data) {\r\n    // 创建表头 \r\n    table.innerHTML = \"\"\r\n    let tr = document.createElement('tr')\r\n    tr.innerHTML =`<th id=\"header\">商品</th>\r\n                    <th id=\"sub-header\">地区</th>\r\n                    <th>1月</th>\r\n                    <th>2月</th>\r\n                    <th>3月</th>\r\n                    <th>4月</th>\r\n                    <th>5月</th>\r\n                    <th>6月</th>\r\n                    <th>7月</th>\r\n                    <th>8月</th>\r\n                    <th>9月</th>\r\n                    <th>10月</th>\r\n                    <th>11月</th>\r\n                    <th>12月</th>`\r\n    table.appendChild(tr)\r\n    tableWrapper.appendChild(table)\r\n\r\n    // 生成数据表格\r\n    for (let i = 0; i < data.length; i++) {\r\n        let tr = document.createElement('tr')\r\n        for (let key in data[i]) {\r\n            if (data[i].hasOwnProperty(key)) {\r\n                if (!Array.isArray(data[i][key])) {\r\n                    let td = document.createElement('td')\r\n                    td.innerHTML = data[i][key]\r\n                    tr.appendChild(td)\r\n                } else {\r\n                    data[i][key].forEach((item) => {\r\n                        let td = document.createElement('td')\r\n                        td.innerHTML = item+`<i>✎</i>`\r\n                        tr.appendChild(td)\r\n                    })\r\n                }\r\n            }\r\n        }\r\n        table.appendChild(tr)\r\n    }\r\n\r\n    // 增加鼠标滑动事件\r\n    $(\"table\").addEventListener(\"mouseover\", (e)=>{\r\n        e=e||e.window\r\n        let target=e.target || e.srcElement\r\n        if(target.tagName === \"TD\"){\r\n            let newdata=[]\r\n            newdata[0]=data[target.parentNode.rowIndex-1]\r\n            Object(_bar_js__WEBPACK_IMPORTED_MODULE_0__[\"drawBarGraph\"])(newdata)\r\n            let line = new _line_js__WEBPACK_IMPORTED_MODULE_1__[\"Line\"]($(\"line-chart\"))\r\n            line.creatPath(newdata)\r\n        }\r\n    },false)\r\n\r\n    $(\"table\").addEventListener(\"mouseout\", (e)=>{\r\n        e=e||e.window\r\n        let target=e.target || e.srcElement\r\n        Object(_bar_js__WEBPACK_IMPORTED_MODULE_0__[\"drawBarGraph\"])(data)\r\n        let line = new _line_js__WEBPACK_IMPORTED_MODULE_1__[\"Line\"]($(\"line-chart\"))\r\n        line.creatPath(data)\r\n    },false)\r\n    \r\n    //绑定修改数值功能\r\n    Object(_edit_js__WEBPACK_IMPORTED_MODULE_2__[\"edit\"])()\r\n    tableWrapper.appendChild(table)\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/table.js?");

/***/ })

/******/ });