import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals'
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    file: 'index.module.js',
    format: 'esm'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({ preferBuiltins: true }),
    commonjs({
      namedExports: {
        'scheduler': ['unstable_scheduleCallback', 'unstable_cancelCallback'],
        'react': ['Component', 'PureComponent', 'useContext', 'useEffect'],
      }
    }),
    globals(),
    builtins(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ]
};
