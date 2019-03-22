// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var entitlements_map = JSON.parse(context.getVariable("graphql_entitlements_map"));
var scopes = context.getVariable("request.header.scope") || '';

var scopes_array = scopes.split(' ');

var entitlements = ['query.__schema.**']; //seeded with instrospection entitlement

scopes_array.forEach(function(scope) {
    if (entitlements_map[scope]) {
        entitlements.push(entitlements_map[scope].join(' '));
    }
});


context.setVariable("entitlements", entitlements.join(' '));


