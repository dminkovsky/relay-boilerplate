import fs from 'fs';
import { graphql }  from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import schema from './schema';

graphql(schema, introspectionQuery)
.then(
    result => fs.writeFileSync('./schema.json', stringify(result))
);

const stringify = obj => JSON.stringify(obj, null, 2);
