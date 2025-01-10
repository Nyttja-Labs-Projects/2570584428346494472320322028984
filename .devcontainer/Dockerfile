# Use the base image
FROM mcr.microsoft.com/devcontainers/typescript-node

# Install Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# Copy your entrypoint script into the container
COPY ../entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set Tini as the entrypoint to handle signal forwarding and process reaping
ENTRYPOINT ["/tini", "--", "/usr/local/bin/entrypoint.sh"]

# (Optional) Define a default command if needed
CMD []