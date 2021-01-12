FROM becomes/cms:2.0.3

WORKDIR /app

# COPY .eslintrc /app
# COPY .eslintignore /app
# COPY .gitignore /app
# COPY .prettierrc /app
# COPY bcms.config.js /app
# COPY bcms.db.json /app
# COPY package-lock.json /app
# COPY package.json /app
# COPY tsconfig.backend.json /app
# COPY tsconfig.json /app
# COPY tsconfig.src.json /app
# COPY src/. /app
# COPY public/. /app

COPY . /app

RUN npm install
RUN npm run src:build

ENTRYPOINT [ "npm", "run", "start:backend" ]
