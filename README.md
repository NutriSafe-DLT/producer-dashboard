## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building the docker file

### Using Visual Studio Code
If you are using Visual Studio Code install the [https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker](Docker plugin).

After installation right click your dockerfile and select "Build image..."
Name your image and enjoy.

### Using the good old terminal
The tag is really up to you, heres an example: 
```
docker build --tag dashboarddev-latest:1.0 .
```

